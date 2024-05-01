const db = require('../../config/db.config');

exports.getProducts = (req, res) => {
    try {
        // Extract user role from request this details get from token
        const role = req.user.role;

        // Define the base query to fetch products
        let query = 'SELECT * FROM products';
        
        let totalCountQuery = 'SELECT COUNT(*) AS total FROM products'; // Query to get total count

        // If the user role is normal user (1), filter products by availability
        //role = 1 (Normal user), 2(Admin user) 
        //If Normal user calling this api then we are returning products if availabitally is 1 and for admin we are returning all products
        if (role === 1) {
            query += ' WHERE availability = 1';
            totalCountQuery += ' WHERE availability = 1';
        }

        // Parse the page number from the request query, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        
        // Execute query to get total count
        db.query(totalCountQuery, (err, countResult) => {
            if (err) {
                //console.error('Error fetching total count:', err);
                logger.error('Error fetching total count:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const totalCount = countResult[0].total; // Extract total count from result
            query += ` LIMIT ${limit} OFFSET ${offset}`;

            // Execute main query to fetch paginated products
            db.query(query, (err, results) => {
                if (err) {
                    //console.error('Error fetching products:', err);
                    logger.error('Error fetching products:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const totalPages = Math.ceil(totalCount / limit); // Calculate total pages
                const paginationData = {
                    total: totalCount,      // Total number of products
                    totalPages: totalPages, // Total number of pages
                    currentPage: page,      // Current page number
                    perPage: limit,         // Number of products per page
                    data: results           // Paginated products for the current page
                };

                // Send pagination data as JSON response
                res.json(paginationData);
            });
        });
    } catch (err) {
        //console.error('Error fetching products:', err);
        logger.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
