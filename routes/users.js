const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - Email
 *       properties:
 *         _id:
 *           type: string
 *         Number:
 *           type: integer
 *         Name_of_Location:
 *           type: string
 *         Date:
 *           type: string
 *         Login_Hour:
 *           type: string
 *         Name:
 *           type: string
 *         Age:
 *           type: integer
 *         gender:
 *           type: string
 *         Email:
 *           type: string
 *         No_Telp:
 *           type: string
 *         Brand_Device:
 *           type: string
 *         Digital_Interest:
 *           type: string
 *         Location_Type:
 *           type: string
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve users
 *     description: Get a paginated list of users or grouped user statistics
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *         description: Field name to group users by (e.g. gender, age, etc.)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of users in database
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     limit:
 *                       type: integer
 *                       description: Number of users per page
 *                     users:
 *                       type: array
 *                       description: List of user objects
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     groupedBy:
 *                       type: string
 *                       description: Field that users were grouped by
 *                     groups:
 *                       type: array
 *                       description: Groups of users with counts
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Group identifier (value of the groupBy field)
 *                           count:
 *                             type: integer
 *                             description: Number of users in this group
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * Get users with pagination or grouping
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.page=1] - Page number for pagination
 * @param {number} [req.query.limit=10] - Number of users per page
 * @param {string} [req.query.groupBy] - Field to group users by (optional)
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} Response
 * @returns {number} response.total - Total number of users (when not grouped)
 * @returns {number} response.page - Current page number (when not grouped)
 * @returns {number} response.limit - Number of users per page (when not grouped)
 * @returns {Array} response.users - Array of user objects (when not grouped)
 * @returns {string} response.groupedBy - Field name used for grouping (when grouped)
 * @returns {Array} response.groups - Array of group objects with _id and count (when grouped)
 * 
 * @throws {Error} 500 - If server error occurs
 */
router.get("/", async (req, res) => {
  try {
    // Get query params or set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get groupBy param
    const groupBy = req.query.groupBy;

    // Group users
    if (groupBy) {
      // Check if groupBy field exists
      if (!User.schema.path(groupBy)) {
        return res.status(400).json({ error: `Invalid groupBy field: ${groupBy}` });
      }

      // Get grouped users
      let grouped = await User.aggregate([
        {
          $group: {
            _id: {
              $toLower: `$${groupBy}`
            },
            count: { $sum: 1 }
          }
        }
      ], { allowDiskUse: true });

      // Map grouped users
      grouped = grouped.map((group) => {
        return {
          value: group._id,
          count: group.count,
        };
      });

      return res.json({
        groupedBy: groupBy,
        groups: grouped,
      });
    }

    // This is for pagination
    // Count total documents
    const total = await User.countDocuments();

    // Get users with pagination
    let users = await User.find().skip(skip).limit(limit);

    // Somehow there is this empty key in the object
    users = users.map((user) => {
      const userObj = user.toObject();
      userObj["id"] = userObj["_id"];
      delete userObj["_id"];
      delete userObj[""];
      return userObj;
    })

    res.json({
      total,
      page,
      limit,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
