# Transaction and rollback

Transactions allow you to run a series of operations that do not change any data until the entire transaction is committed. If any operation in the transaction fails, the driver ends the transaction and discards all data changes before they ever become visible. This feature is called atomicity.

This provides the following methods to implement transactions:

- `startSession()` - creates a new ClientSession instance
- `startTransaction()` - starts a new transaction
- `commitTransaction()` - commits the active transaction in the session that it was created in
- `abortTransaction()` - ends the active transaction in the session that it was created in
- `endSession()` - ends the active session

### Example of using transaction in mongoose

```
const example = async () => {
    const session = await conn.startSession();

    try {
        session.startTransaction();

        await Model.create([{ /* payload */ }], { session });

        await Model.deleteOne({ /* conditions */ }, { session });

        await Model.updateOne({ /* conditions */ }, { /* payload */ }, { session } );

        await Model.findByIdAndUpdate(_id, { /* payload */  }, { session });

        const user = new Model( /* payload */);
        await user.save({ session });

        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }
  }
```
