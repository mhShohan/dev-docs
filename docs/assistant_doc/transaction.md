```ts
const session = await mongoose.startSession();
try {
  await session.startTransaction();

  const result = await Team.create([payload], { session });
  await TeamMember.create([{ userId: payload.creatorId, teamId: result[0]?._id }], { session });

  await session.commitTransaction();
  await session.endSession();

  return result[0];
} catch (error) {
  await session.abortTransaction();
  await session.endSession();

  throw new CustomError(StatusCode.BAD_REQUEST, 'Team cannot be created');
}
```
