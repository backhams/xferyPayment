const express = require("express");
const cors = require("cors");
const UserPayment = require("./userSchema")
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 6000;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const allowPath = process.env.ORIGIN;

//this is the gateway to contact with database which is located in cloudbase
const DB = process.env.DATABASE;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful....`);
  })
  .catch((err) => {
    console.log(`no connection`);
  });

//This is to pars json file into javascript object to understand by machine
app.use(express.json());

// Enable CORS middleware
const corsOptions = {
  origin: allowPath,
};

app.use(cors(corsOptions));


// payment update route
app.delete("/updatePayment", async (req, res) => {
  const { email, variantId } = req.query;

  try {
    // Find and delete the document where both userEmail and variantId match
    const deletedPayment = await UserPayment.findOneAndDelete({ userEmail: email, variantId: variantId });

    if (!deletedPayment) {
      // If no matching document was found
      return res.status(404).json({ error: "Payment not found" });
    }

    // Payment was successfully deleted
    res.status(200).json({ message: "Payment information updated successfully" });
  } catch (error) {
    console.error("Error updating payment information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
