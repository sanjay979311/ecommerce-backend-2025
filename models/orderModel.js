
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//     {
//         orderId: {  // New Unique Order ID Field
//             type: String,
//             unique: true,
//             required: true
//         },
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true
//         },
//         products: [
//             {
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "Product",
//                     required: true
//                 },
//                 quantity: {
//                     type: Number,
//                     required: true,
//                     default: 1,
//                     min: 1
//                 },
//                 priceAtOrder: {  // Store price at time of order
//                     type: Number,
//                     required: true
//                 }
//             }
//         ],
//         totalPrice: {
//             type: Number,
//             required: true,
//             min: 0
//         },
//         status: {
//             type: String,
//             enum: [
//                 "Pending",         // Order placed, awaiting confirmation
//                 "Processing",      // Order is being prepared
//                 "Dispatched",      // Order left the warehouse, in transit to delivery hub
//                 "Shipped",         // Order handed over to the courier service
//                 "Out for Delivery",// Last-mile delivery, arriving soon
//                 "Delivered",       // Order successfully delivered
//                 "Cancelled",       // Order cancelled before shipping
//                 "Returned",        // Customer returned the order
//                 "Refunded"         // Refund processed
//             ],
//             default: "Pending",
//         },
//         address: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Address",
//             required: true
//         },
//         paymentMethod: {  // Fixed to Only "Cash on Delivery"
//             type: String,
//             enum: ["Cash on Delivery"],
//             default: "Cash on Delivery",
//             required: true
//         },
//         paymentStatus: {
//             type: String,
//             enum: ["Pending", "Dispatched", "Delivered", "Cancelled", "Refunded"],
//             default: "Pending"
//         }
//     },
//     { timestamps: true }
// );

// const Order = mongoose.model("Order", orderSchema);
// export default Order;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {

        orderId: { type: String, unique: true, required: true }, // Unique Order ID
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who placed the order
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                priceAtOrder: { type: Number, required: true }
            }
        ],
        totalPrice: { type: Number, required: true },
        address: { type: String, required: true },
        // paymentMethod: { type: String, enum: ["Cash on Delivery", "Credit", "Debit", "UPI", "Net Banking"], required: true },
        paymentMethod: {  // Fixed to Only "Cash on Delivery"
            type: String,
            enum: ["Cash on Delivery", "Credit", "Debit", "UPI", "Net Banking"],
            default: "Cash on Delivery",
            // required: true
        },
        status: {
            type: String,
            enum: [
                "Pending",         // Order placed, awaiting confirmation
                "Processing",      // Order is being prepared
                "Dispatched",      // Order left the warehouse, in transit to delivery hub
                "Shipped",         // Order handed over to the courier service
                "Out for Delivery",// Last-mile delivery, arriving soon
                "Delivered",       // Order successfully delivered
                "Cancelled",       // Order cancelled before shipping
                "Returned",        // Customer returned the order
                "Refunded"         // Refund processed
            ],
            default: "Pending",
        },
        // status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
        paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" }
    },
    { timestamps: true } // ✅ Automatically adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
