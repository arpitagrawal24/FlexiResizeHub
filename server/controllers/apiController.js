const Data = require("../models/Data");
const Count = require("../models/Count");


// Get all data
exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json({ message: "Data retrieved successfully", data });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add new data
exports.addData = async (req, res) => {
  try {
    await Data.deleteMany({});

    const { title, description } = req.body;

    const data = new Data({ title, description });
    await data.save();

    // Update the addOperation count
    await updateCount("addOperation");

    res.status(201).json({ message: "Data added successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update existing data by ID
exports.editData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Update entry and return the updated document
    const newData = await Data.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    // Update the updateOperation count
    await updateCount("updateOperation");

    res.status(200).json({ message: "Data updated successfully", newData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCount = async (req, res) => {
  try {
    let count = await Count.findOne();
    if (!count) {
      // Initialize count with default values
      count = { addOperation: 0, updateOperation: 0, timeStamps: new Date() };
    }

    // Check if the last update time is more than a day ago
    const lastUpdateTime = count.timeStamps;
    const currentTime = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    if (currentTime - lastUpdateTime > oneDayInMillis) {
      // Reset the counts if more than a day has passed
      count.addOperation = 0;
      count.updateOperation = 0;
      await count.save();
    }

    res.status(200).json({ message: "Count retrieved successfully", count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to update count
async function updateCount(operationType) {
  let count = await Count.findOne();
  if (!count) {
    count = new Count();
  }
  count[operationType]++;
  count.timeStamps = new Date();
  await count.save();
}
