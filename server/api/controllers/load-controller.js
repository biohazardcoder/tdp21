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
      const load = await Load.findById(id)
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
  
export const ConnectingDriver = async (req, res) => {
  try {
    
    const { driver, id } = req.body;

    const load = await Load.findById(id);
    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }
    
    const currentDriver = await User.findById(driver);
    if (!currentDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    const user = await clerkClient.users.getUser(currentDriver.clerkId)

    load.connections.push({driver : {
        clerkId :user.id,
        firstName :  user.firstName,
        lastName : user.lastName,
        fullName:user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        imageUrl:user.imageUrl
    }});
    currentDriver.connecting.push({load : id});
    
    await currentDriver.save();
    await load.save(); 

    res.status(200).json({ message: "Connected" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem in connecting the driver", error:error });
  }
};

  export const ConnectedDriver = async (req, res) => {
    try {
        const { driver, id } = req.body;

        const load = await Load.findById(id);
        if (!load) {
          return res.status(404).json({ message: "Load not found" });
        }

        const currentDriver = await clerkClient.users.getUser(driver);
        if (!currentDriver) {
          return res.status(404).json({ message: "Driver not found" });
        }

        const clerkId = driver || "";
        const user = await User.findOne({ clerkId });

        
        load.connentor.driver = {
          clerkId : driver,
          firstName :  currentDriver.firstName,
          lastName : currentDriver.lastName,
          fullName: currentDriver.fullName,
          email: currentDriver.primaryEmailAddress.emailAddress,
          imageUrl:currentDriver.imageUrl,
          date: Date.now(),
          id: user._id
        }
        
        
        user.connecting = user.connecting.filter(
          (conn) => conn.load.toString() !== id
        );
        user.loads.push(id)
        const onePercentOfPrice = load.price / 100;
        user.coins -= onePercentOfPrice;
        
      await User.updateMany(
        {
          _id: { $ne: user._id },
          "connecting.load": id,
        },
        {
          $set: { "connecting.$[elem].status": "Canceled" },
        },
        {
          arrayFilters: [{ "elem.load": id }],
        }
      );
      await user.save();
      await load.save();
      res.status(200).json({ message: "Connected" });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: "Problem in connect the driver", error });
    }
  };
  