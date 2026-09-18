function fromUrl(url) {
    if (!url) {
      return {
        dialect: "postgres",
        logging: false,
      };
    }
  
    return {
      url,
      dialect: "postgres",
      logging: false,
    };
  }
  
  module.exports = {
    development: fromUrl(
      process.env.DATABASE_URL ||
        "postgres://postgres:postgres@localhost:5432/tasks_dev"
    ),
    test: fromUrl(
      process.env.DATABASE_URL_TEST ||
        "postgres://postgres:postgres@localhost:5432/tasks_test"
    ),
    production: fromUrl(process.env.DATABASE_URL),
  };