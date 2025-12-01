import db from "../config/db.js";

export const getProducts = (req, res) => {
    const sql = `
     select
     \`productID (PK)\` AS productID,
     \`productName\` AS productName,
     \`productStage\` AS productStage
     FROM products
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: "Database fetch error" });
        }
        res.json(results);
    });
};

export const addProduct = (req, res) => {
    const {
        productID,
        productName,
        productStage
    } = req.body;

    const sql = `
    insert into products (\`productID (PK)\`,\`productName\`,\`productStage\`)
    values (?,?,?)
    `;

    db.query(
        sql,
        [productID, productName, productStage],
        (err) => {
            if (err) {
                console.error("Error adding product:", err);
                return res.status(500).json({ error: "Insert Failed" });
            }
            res.json({ message: "Product added Successfully" })
        }
    );
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const {
        productName,
        productStage
    } = req.body;

    const sql = `
    Update products
    set
    \`productName\`=?,
     \`ProductStage\`=?
        where \`productID (PK)\`=?
    `;

    db.query(
        sql,
        [productName, productStage, id],
        (err) => {
            if (err) {
                console.error("Error updating product:", err);
                return res.status(500).json({ error: "Update failed" });
            }
            res.json({ message: "Product updated successfully" });
        }
    );
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = "Delete from products where `productID (PK)`=?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "delete failed" });
        }
        res.json({ message: "Product deleted successfully" });
    });
};