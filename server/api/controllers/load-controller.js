import Load from "../models/load-model.js";
import User from "../models/user-model.js";
import {clerkClient} from "@clerk/express"


export const GetAllLoads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Load.countDocuments();
    const loads = await Load.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({
      loads,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Problem in getting loads.", error });
  }
};


export const GetLoadById = async (req, res) => {
  try {
      const { id } = req.params;
      const load = await Load.findById(id);
      if (!load) return res.status(404).json({ message: "Load not found." });

      const creator = await clerkClient.users.getUser(load.clerkId)
      res.status(200).json({ load, creator });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem in getting loads.", error });
  }
}
export const CreateLoad = async (req, res) => {
    try {
      const locationData = JSON.parse(req.body.location);
      const weightData = JSON.parse(req.body.weight);
  
      if (!locationData.from.city || !locationData.to.city) {
        return res.status(400).json({ message: "Both origin and destination cities are required." });
      }
      if (!weightData.number) {
        return res.status(400).json({ message: "Weight number is required." });
      }
  
      const {
        clerkId,
        title,
        description,
        price,
        contact,
        fridge
      } = req.body;
  
      const creator = await User.findOne({ clerkId: clerkId });
      const newLoad = await Load.create({
        clerkId,
        title,
        description,
        price,
        contact,
        weight: {
          number: weightData.number,
          type: weightData.type,
        },
        images: req.uploadedImages, 
        location: locationData,
        fridge: fridge === "true" ? true : false, 
      });
  
      creator.myLoads.push(newLoad._id);
      await creator.save();
      res.status(200).json({ message: "New load created successfully.", data: newLoad });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Problem in creating new load.", error });
    }
  };
  
  // export const ConnectedDriver = async (req, res) => {
  //   try {
  //     const { driver,  id } = req.body;
  
  //     const load = await Load.findById(id);
  //     if (!load) {
  //       return res.status(404).json({ message: "Load not found" });
  //     }
  
  //     const currentDriver = await Driver.findById(driver);
  //     if (!currentDriver) {
  //       return res.status(404).json({ message: "Driver not found" });
  //     }
  //     currentDriver.connecting = currentDriver.connecting.filter(
  //       (conn) => conn.load.toString() !== id
  //     );
  //     currentDriver.connected.push(id);
  //     const onePercentOfPrice = load.price / 100;
  //     currentDriver.coins -= onePercentOfPrice;
  //     await Driver.updateMany(
  //       {
  //         _id: { $ne: driver }, 
  //         "connecting.load": id,
  //       },
  //       {
  //         $set: { "connecting.$[elem].status": "Canceled" },
  //       },
  //       {
  //         arrayFilters: [{ "elem.load": id }],
  //       }
  //     );
  //     load.connentor.driver = driver;
  //     await currentDriver.save();
  //     await load.save();
  
  //     res.status(200).json({ message: "Connected" });
  //   } catch (error) {
  //     res.status(500).json({ message: "Problem in connect the driver", error });
  //   }
  // };
  
  
  // export const ConnectingDriver = async (req, res) => {
  //   try {
      
  //     const { driver, id } = req.body;
  
  //     const load = await Load.findById(id);
  //     if (!load) {
  //       return res.status(404).json({ message: "Load not found" });
  //     }
  
  //     const currentDriver = await Driver.findById(driver);
  //     if (!currentDriver) {
  //       return res.status(404).json({ message: "Driver not found" });
  //     }
  
  //     load.connections.push({driver : driver});
  //     currentDriver.connecting.push({load : id});
  
  //     await currentDriver.save();
  //     await load.save(); 
  
  //     res.status(200).json({ message: "Connected" });
  //   } catch (error) {
  //     res.status(500).json({ message: "Problem in connecting the driver", error:error });
  //   }
  // };


  // export const CanceledConnecting = async (req, res) => {
  //   try {
  //     const { driver, id } = req.body;
  
  //     const load = await Load.findById(id);
  //     if (!load) {
  //       return res.status(404).json({ message: "Load not found" });
  //     }
  
  //     const currentDriver = await Driver.findById(driver);
  //     if (!currentDriver) {
  //       return res.status(404).json({ message: "Driver not found" });
  //     }
  
  //     const connectingItem = currentDriver.connecting.find(
  //       (item) => item.load == id
  //     );
  
  //     if (!connectingItem) {
  //       return res.status(404).json({ message: "Load not found in driver's connecting list" });
  //     }
  
  //     load.connections = load.connections.filter(
  //       (conn) => conn.driver != driver
  //     );
  
  //     connectingItem.status = "Canceled";
  
  //     await load.save();
  //     await currentDriver.save();
  
  //     return res.status(200).json({ message: "Connection canceled successfully" });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Server error" });
  //   }
  // };
  
  
  // export const DisconnectConnecting = async (req,res) => {
  //   try {
  //     const { driver, id } = req.body;
      
  //     const load = await Load.findById(id);
  //     if (!load) {
  //       return res.status(404).json({ message: "Load not found" });
  //     }
  
  //     const currentDriver = await Driver.findById(driver);
  //     if (!currentDriver) {
  //       return res.status(404).json({ message: "Driver not found" });
  //     }
  //     load.connentor = {}
  //     load.connections=[]
  //     await load.save();

  //     currentDriver.connected = currentDriver.connected.filter(
  //       (loadId) => loadId.toString() !== id
  //     );
  //     await currentDriver.save();
  //     return res.status(200).json({ message: "Driver disconnected successfully" });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: "Server error" });
      
  //   }
  // }