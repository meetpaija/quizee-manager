
export const timestamp = (schema) => {
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  schema.pre("save", async function (next) {
    let now = Date.now();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
};
