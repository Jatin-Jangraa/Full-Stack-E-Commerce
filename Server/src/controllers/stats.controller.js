// import { mycache } from "../index.js";
import { Order } from "../models/orders.model.js";
import { Product } from "../models/product.models.js";
import Userdata from "../models/user.models.js";
import { calculatePercentage, getChartData, getInventories, list } from "../utils/features.js";

export const getstats = async (req, res) => {
  let stats;

  //   const key = "admin-stats";

  //   const today = new Date();

  //   const sixmonthago = new Date();
  //   sixmonthago.setMonth(sixmonthago.getMonth() - 6);

  //   const thismonth = {
  //     start: new Date(),
  //   };

  //   return res.json({
  //     message: "true",
  //     stats,
  //     startthis: startofthidmonth,
  //     startoflast: startoflastmonth,
  //     endoflast: endoflastmonth,
  //   });
  // };

  // export const getpie = async () => {};

  // export const getbar = async () => {};

  // export const getline = async () => {};


  // const key = "admin-stats";

  //   stats = await redis.get(key);

  //   if (stats) stats = JSON.parse(stats);
  //   else {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  console.log(sixMonthsAgo);


  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };

  const thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthUsersPromise = Userdata.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthUsersPromise = Userdata.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const lastSixMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  });

  const latestTransactionsPromise = Order.find({})
    .select(["orderitems", "discount", "total", "status","user","name"]).sort({createdAt: -1}).limit(4);

    

  const [
    thisMonthProducts,
    thisMonthUsers,
    thisMonthOrders,
    lastMonthProducts,
    lastMonthUsers,
    lastMonthOrders,
    productsCount,
    usersCount,
    allOrders,
    lastSixMonthOrders,
    categories,
    femaleUsersCount,
    latestTransaction,
  ] = await Promise.all([
    thisMonthProductsPromise,
    thisMonthUsersPromise,
    thisMonthOrdersPromise,
    lastMonthProductsPromise,
    lastMonthUsersPromise,
    lastMonthOrdersPromise,
    Product.countDocuments(),
    Userdata.countDocuments(),
    Order.find({}).select("total"),
    lastSixMonthOrdersPromise,
    Product.distinct("category"),
    Userdata.countDocuments({ gender: "Female" }),
    latestTransactionsPromise,
    
  ]);

  const thisMonthRevenue = thisMonthOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const lastMonthRevenue = lastMonthOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const changePercent = {
    revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
    product: calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    ),
    user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
    order: calculatePercentage(
      thisMonthOrders.length,
      lastMonthOrders.length
    ),
  };

  const revenue = allOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const count = {
    revenue: {
      name: "Revenue",
      amount: revenue,
    },

    product: {
      name: "Products",
      amount: productsCount,
    },

    user: {
      name: "User",
      amount: usersCount,
    },
    

    transaction: {
      name: "Transactions",
      amount: allOrders.length,
    }

  };

  const orderMonthCounts = new Array(6).fill(0);
  const orderMonthyRevenue = new Array(6).fill(0);

  lastSixMonthOrders.forEach((order) => {
    const creationDate = order.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < 6) {
      orderMonthCounts[6 - monthDiff - 1] += 1;
      orderMonthyRevenue[6 - monthDiff - 1] += order.total;
    }
  });





  const listofmonth = list()





  const categoryCount = await getInventories({
    categories,
    productsCount,
  });

  const userRatio = {
    male: usersCount - femaleUsersCount,
    female: femaleUsersCount,
  };

  const modifiedLatestTransaction = latestTransaction.map((i) => ({
    // _id: i._id,
    name:i.name,
    discount: i.discount,
    amount: i.total,
      // quantity: i.orderitems.length,
    status: i.status,
  }));

  stats = {
    categoryCount,
    changePercent,
    count,
    chart:[
        { year: (listofmonth[0]).slice(0, 3), Orders: orderMonthCounts[0], Revenue: orderMonthyRevenue[0] / 1000 },
        { year: (listofmonth[1]).slice(0, 3), Orders: orderMonthCounts[1], Revenue: orderMonthyRevenue[1] / 1000 },
        { year: (listofmonth[2]).slice(0, 3), Orders: orderMonthCounts[2], Revenue: orderMonthyRevenue[2] / 1000 },
        { year: (listofmonth[3]).slice(0, 3), Orders: orderMonthCounts[3], Revenue: orderMonthyRevenue[3] / 1000 },
        { year: (listofmonth[4]).slice(0, 3), Orders: orderMonthCounts[4], Revenue: orderMonthyRevenue[4] / 1000 },
        { year: (listofmonth[5]).slice(0, 3), Orders: orderMonthCounts[5], Revenue: orderMonthyRevenue[5] / 1000 },
      ],

    userRatio,
    latestTransaction: modifiedLatestTransaction,
  };

  // await redis.setex(key, redisTTL, JSON.stringify(stats));


  return res.status(200).json({
    success: true,
    stats,
  });
};

export const getPie = (async (req, res, next) => {
  let charts;
  //   const key = "admin-pie-charts";

  //   charts = await redis.get(key);

  //   if (charts) charts = JSON.parse(charts);
  //   else {
  const allOrderPromise = Order.find({}).select([
    "total",
    "discount",
    "subtotal",
    "tax",
    "shippingcharges",
  ]);

  const [
    processingOrder,
    shippedOrder,
    deliveredOrder,
    categories,
    productsCount,
    outOfStock,
    allOrders,
    allUsers,
    adminUsers,
    customerUsers,
  ] = await Promise.all([
    Order.countDocuments({ status: "Processing" }),
    Order.countDocuments({ status: "Shipped" }),
    Order.countDocuments({ status: "Delivered" }),
    Product.distinct("category"),
    Product.countDocuments(),
    Product.countDocuments({ stock: 0 }),
    allOrderPromise,
    Userdata.find({}).select(["dob"]),
    Userdata.countDocuments({ role: "admin" }),
    Userdata.countDocuments({ role: "user" }),
  ]);

  const orderFullfillment = [
    {name:"processing",number: processingOrder},

    {name:"shipped",number: shippedOrder},

    {name:"delivered",number: deliveredOrder},
  ];

  const productCategories = await getInventories({
    categories,
    productsCount,
  });

  const stockAvailablity = [
  {name:  "inStock",number: productsCount - outOfStock},
   { name:"outOfStock",number:outOfStock},
  ];

  const grossIncome = allOrders.reduce(
    (prev, order) => prev + (order.total || 0),
    0
  );

  const discount = allOrders.reduce(
    (prev, order) => prev + (order.discount || 0),
    0
  );

  const productionCost = allOrders.reduce(
    (prev, order) => prev + (order.shippingcharges || 0),
    0
  );

  const burnt = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);

  const marketingCost = Math.round(grossIncome * (30 / 100));

  const netMargin =
    grossIncome - discount - productionCost - burnt - marketingCost;

  const revenueDistribution = [
    {name:"netMargin",number:netMargin},
    {name:"discount",number:discount},
    {name:"productionCost",number:productionCost},
    {name:"burnt",number:burnt},
    {name:"marketingCost",number:marketingCost},
  
  ];

 

  const adminCustomer = [
   {name: "admin",number: adminUsers},
   {name: "customer",number: customerUsers,}
  ];

  charts = {
    orderFullfillment,
    productCategories,
    stockAvailablity,
    revenueDistribution,
    
    adminCustomer,
  };

  //     await redis.setex(key, redisTTL, JSON.stringify(charts));


  return res.status(200).json({
    success: true,
    charts,
  });
});

export const getBarCharts = async (req, res, next) => {
  let charts;
  //   const key = "admin-bar-charts";

  //   charts = await redis.get(key);

  //   if (charts) charts = JSON.parse(charts);
  //   else {
  const today = new Date();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const sixMonthProductPromise = Product.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const sixMonthUsersPromise = Userdata.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const twelveMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const [products, users, orders] = await Promise.all([
    sixMonthProductPromise,
    sixMonthUsersPromise,
    twelveMonthOrdersPromise,
  ]);

  const productCounts = getChartData({ length: 6, today, docArr: products });
  const usersCounts = getChartData({ length: 6, today, docArr: users });
  const ordersCounts = getChartData({ length: 6, today, docArr: orders });
  const listofmonth = list()

  charts = {
    months:listofmonth,
    users: usersCounts,
    products: productCounts,
    orders: ordersCounts,
  };

  //     await redis.setex(key, redisTTL, JSON.stringify(charts));
  //   }

  return res.status(200).json({
    success: true,
    charts,
  });
};

export const getLineCharts = async (req, res, next) => {
  let charts;
  //   const key = "admin-line-charts";

  //   charts = await redis.get(key);

  //   if (charts) charts = JSON.parse(charts);
  //   else {
  const today = new Date();

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const baseQuery = {
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  };

  const [products, users, orders] = await Promise.all([
    Product.find(baseQuery).select("createdAt"),
    Userdata.find(baseQuery).select("createdAt"),
    Order.find(baseQuery).select(["createdAt", "discount", "total"]),
  ]);

  const productCounts = getChartData({ length: 12, today, docArr: products });
  const usersCounts = getChartData({ length: 12, today, docArr: users });
  const discount = getChartData({
    length: 12,
    today,
    docArr: orders,
    property: "discount",
  });
  const revenue = getChartData({
    length: 12,
    today,
    docArr: orders,
    property: "total",
  });

  charts = {
    users: usersCounts,
    products: productCounts,
    discount,
    revenue,
  }

  res.json(charts)

};

// await redis.setex(key, redisTTL, JSON.stringify(charts));
