'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User has many courses
            User.hasMany(models.Course, {
                foreignKey: {
                    fieldName: 'userId',
                    allowNull: false
                }
            })
        }
    };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A first name is required'
                },
                notEmpty: {
                    msg: 'Please provide a first name'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A last name is required'
                },
                notEmpty: {
                    msg: 'Please provide a last name'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'An email address is required'
                },
                notEmpty: {
                    msg: 'Please provide an email address'
                },
                // isUnique(val) {
                //     return User.findOne({
                //       where: {
                //         emailAddress: val
                //       }
                //     }).then(emailAddress => {
                //       if (emailAddress) {
                //         throw new Error("This email has already been taken.")
                //       }
                //     })
                // }
            },
            unique: {
                args: true,
                msg: "This email has already been taken."
            }
        },
        password: {
            type: DataTypes.STRING,  
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                }
            },
            // set(val) {
                //     if(val.trim().length !== 0) {
                    //         const hashedPassword = bcrypt.hashSync(val, 10);
                    //         this.setDataValue('password', hashedPassword);
                    //     }
                    // },
        }
    }, {
        // Hash the password using bcryptjs, before model created.
        hooks: {
            beforeCreate: async (user) => 
                (user.password = await bcrypt.hashSync(user.password, 10))
        },
        sequelize,
        modelName: 'User',
    });

    return User;
};