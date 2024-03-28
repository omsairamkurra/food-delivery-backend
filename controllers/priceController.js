const db = require("../models/db");

exports.calculatePrice = async (req, res, next) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;
    console.log("Request Body:", req.body);

    const pricing = await db.Pricing.findOne({
      where: {
        zone,
        organizationId: organization_id,
      },
      include: [
        {
          model: db.Item,
          where: { type: item_type },
        },
      ],
    });
    console.log("Pricing:", pricing);

    if (!pricing) {
      return res.status(404).json({ error: "Pricing not found" });
    }

    let totalPrice = pricing.fix_price;
    if (total_distance > pricing.base_distance_in_km) {
      const additionalDistance = total_distance - pricing.base_distance_in_km;
      totalPrice += additionalDistance * pricing.km_price * 100;
    }

    res.json({ total_price: totalPrice / 100 });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

exports.createPrice = async (req, res, next) => {
  try {
    const { zone, base_distance_in_km, km_price, fix_price } = req.body;

    const newPrice = await db.Pricing.create({
      zone,
      base_distance_in_km,
      km_price,
      fix_price,
    });

    res.status(201).json(newPrice);
  } catch (error) {
    next(error);
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newOrganization = await db.Organization.create({
      name,
    });

    res.status(201).json(newOrganization);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { type, description } = req.body;

    const newItem = await db.Item.create({
      type,
      description,
    });

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};
