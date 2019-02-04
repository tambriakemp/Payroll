module.exports = {
    //'url' :  process.env.DATABASE_URL || "mongodb://cre8visionsllc:adminpassword@payrolldeduction-shard-00-00-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-01-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-02-pkxd7.mongodb.net:27017/payrolldeduction?ssl=true&replicaSet=payrolldeduction-shard-0&authSource=admin&retryWrites=true",
    'url' :  process.env.DATABASE_URL || "mongodb://localhost/payroll",
};