const { User, Transaction } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // me: User
    user: async () => {
      return User.find();
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('transactions');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    transactions: async (parent, args) => {
     
      return await Transaction.find({}).populate('username').sort({ date: 'desc' });
    
    },
  },
  Mutation: {
    // addUser
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // add a transaction
    addTransaction: async (parent, { title, amount, date, category, description }, context) => {
      try {
        console.log(context)
        if (context.user) {
          console.log('trying to add transaction!')
          console.log(context.user.username);
          const transaction = await Transaction.create(
            {
              title, 
              amount, 
              date, 
              category, 
              description 
            }
          );

          console.log("transaction", transaction);
          console.log("context.user._id", context.user._id);

          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { transactions: transaction._id } }
          );
          console.log(transaction);
          console.log(user);
          return transaction;

        } else {
          throw AuthenticationError;
        }
      } catch (err) {
        throw AuthenticationError;
      }
    },
    // delete a transaction
    deleteTransaction: async (parent, { transactionId }, context) => {
      if (context.user) {
        const transaction = await Transaction.findOneAndDelete({
          _id: transactionId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { transactions: transaction._id } }
        );

        return transaction;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
