import Order from '../models/Order.js';
import Gamme from '../models/Gamme.js';

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { customer, items, paymentMethod, notes } = req.body;

    // Vérifier les items et calculer le total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const gamme = await Gamme.findById(item.gamme);
      
      if (!gamme) {
        return res.status(404).json({
          success: false,
          message: `Gamme non trouvée: ${item.gamme}`
        });
      }

      if (!gamme.inStock) {
        return res.status(400).json({
          success: false,
          message: `Gamme en rupture de stock: ${gamme.name}`
        });
      }

      const price = gamme.getCurrentPrice();
      totalAmount += price * item.quantity;

      orderItems.push({
        gamme: gamme._id,
        name: gamme.name,
        quantity: item.quantity,
        price: price
      });
    }

    // Créer la commande
    const order = await Order.create({
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod,
      notes
    });

    await order.populate('items.gamme');

    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      data: order
    });
  } catch (error) {
    console.error('❌ Erreur création commande:', error);
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de la commande',
      error: error.message
    });
  }
};

// @desc    Récupérer toutes les commandes
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;
    
    let filter = {};
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
      .populate('items.gamme')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des commandes',
      error: error.message
    });
  }
};

// @desc    Récupérer une commande par ID
// @route   GET /api/orders/:id
// @access  Private/Admin
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.gamme');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la commande',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le statut d'une commande
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingInfo } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingInfo) order.trackingInfo = trackingInfo;

    await order.save();

    res.json({
      success: true,
      message: 'Statut de la commande mis à jour',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};

// @desc    Récupérer les statistiques des commandes
// @route   GET /api/orders/stats
// @access  Private/Admin
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const confirmedOrders = await Order.countDocuments({ orderStatus: 'confirmed' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    
    // Revenu total de toutes les commandes
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};
