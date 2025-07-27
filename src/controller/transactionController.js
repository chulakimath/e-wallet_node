import { sql } from "../config/db.js";
export const getTransactionByUserId = async (req, res) => {
    try {
        // const { user_id } = req.params;
        const { id, email } = req.user;
        const usertransactions = await sql`SELECT * FROM transactions WHERE user_id=${id} ORDER BY created_at DESC`;
        res.status(200).json({ message: "success", data: usertransactions })
    } catch (error) {
        console.log("get_transaction_by_id", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const deleteTransactionByRowId = async (req, res) => {
    try {
        let { row_id } = req.params;
        let original_id = row_id;
        row_id = parseInt(row_id);
        if (isNaN(parseInt(row_id))) {
            return res.status(400).json({ message: `${original_id} is not valid id` })
        }
        const response = await sql`DELETE FROM transactions WHERE id=${row_id} RETURNING *`
        if (response.length === 0) {
            return res.status(404).json({ message: "Resouce not found" })
        }
        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        console.log("delete error", error);
        res.status(500).json({ message: "Internal server error !!" });
    }

}

export const createTransactionById = async (req, res) => {
    const { id, email } = req.user;
    try {
        const { amount, title, category } = req.body ?? {}
        if ( amount == undefined || !title || !category) {
            return res.status(400).json({ message: "Missing info" });
        }
        const response = await sql`
            INSERT INTO transactions(user_id,title,amount,category) 
            VALUES (${id},${title},${amount},${category})
            RETURNING *
        `;
        res.status(201).json({ message: "Created", data: response });
    } catch (error) {
        console.log("Post transaction error", error);
        res.status(500).json({ message: "Internal server error !!!" });
    }
}

export const getSummaryByUserId = async (req, res) => {
    try {
        // let { user_id } = req.params;
        const { id, email } = req.user;
        let original_id = id;
        



        const summary = await sql`SELECT  
        COALESCE(SUM(amount),0) as balance ,
        COALESCE(SUM(CASE WHEN amount>0 THEN amount ELSE 0 END),0) as income,
        COALESCE(SUM(CASE WHEN amount<0 THEN amount ELSE 0 END),0) as expnse
        FROM transactions 
        WHERE user_id=${id}`;
        res.status(200).json({ message: "success", status: 1, data: summary });

    } catch (error) {
        console.log("summary error", error);
    }

}