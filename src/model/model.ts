import Token from './databaseModels/Token';
import User from './databaseModels/User';
import Permission from './databaseModels/Permission';
import Products from './databaseModels/Products';
import Size from './databaseModels/Size';
import Style from './databaseModels/Style';
import Reject from './databaseModels/Reject';
import Defects from './databaseModels/Defects';
import PermissionToUser from './databaseModels/PermissionToUser';
import Shift from './databaseModels/Shift';
import Round from './databaseModels/Round';

User.hasMany(Token);
Token.belongsTo(User)

User.belongsToMany(Permission, {
  through: PermissionToUser
})
Permission.belongsToMany(User, {
  through: PermissionToUser
});

User.hasMany(Defects);
Defects.belongsTo(User);

Size.hasMany(Products);
Products.belongsTo(Size);

Style.hasMany(Products);
Products.belongsTo(Style);

Shift.hasMany(Products);
Products.belongsTo(Shift);

Round.hasMany(Products);
Products.belongsTo(Round);

Products.belongsToMany(Reject, {
  through: {
    model: Defects,
    unique: false
  },
  foreignKey: 'productsId',
  otherKey: 'rejectId',
});

Reject.belongsToMany(Products, {
  through: {
    model: Defects,
    unique: false
  },
  foreignKey: 'rejectId',
  otherKey: 'productsId',
});

export {
  Products,
  Reject,
  User,
  Token,
  Size,
  Style,
  Permission,
  Defects,
  PermissionToUser,
  Shift,
  Round
}