const { admin, db } = require("../config/admin-config");

exports.getAll = async (req, res) => {
  const { page } = req.query;
  let items = [];
  let content = !page ? req.url.split("/")[1] : page;

  try {
    const itemsRef = await admin.firestore().collection(`${content}`);

    const allitems = await itemsRef.get();

    if (allitems.size === 0) {
      return res.send({
        message: `Content for ${content} does not exist or there are no items available`,
      });
    } else {
      allitems.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).json(items);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: `Something went wront cannot retrieve ${content}` });
  }
};

exports.deleteItem = async (req, res) => {
  const { section, name, page } = req.params;
  let content = !page ? req.url.split("/")[1] : page;
  let item = section ? section : name;

  try {
    const contentRef = await db.collection(`${content}`).doc(`${item}`);
    const doc = await contentRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: "This content does not exist" });
    } else {
      await db.collection(`${content}`).doc(`${item}`).delete();

      if (!page) return;

      return res
        .status(200)
        .json({ message: "This content has now been deleted", item });
    }
  } catch (error) {
    res.send({ message: "Something went wrong when deleting from collection" });
  }
};
