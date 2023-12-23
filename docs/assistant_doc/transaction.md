# Example of using transaction in mongoose

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
    }
    session.endSession();
    session.endSession();
}
```
