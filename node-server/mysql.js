// 数据库相关信息  npm mysql是一个js插件不完全是mysql
let mysql = require('mysql')
const db_config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'lesson1'
}

// 函数封装了连接数据库和执行 SQL 查询的过程,以 Promise 的形式返回查询结果。其他模块可以通过导入该模块并调用 conMysql 函数来连接数据库并执行查询。
// function conMysql(sql) {
//   let connect = mysql.createConnection(db_config)
//   // 开始连接数据库
//   connect.connect(function (err) {
//     if (err) {
//       console.log(`mysql连接失败: ${err}!`)
//     } else {
//       console.log('mysql连接成功!')
//     }
//   })
//   return new Promise((resolve, reject) => {
//     connect.query(sql, (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         let res = JSON.parse(JSON.stringify(result))
//         closeMysql(connect)
//         resolve(res)
//       }
//     })
//   })
// }

function conMysql(sql, values) {
  let connect = mysql.createConnection(db_config);
  
  // 开始连接数据库
  connect.connect(function (err) {
    if (err) {
      console.log(`mysql连接失败: ${err}!`);
    } else {
      console.log('mysql连接成功!');
    }
  });
  
  return new Promise((resolve, reject) => {
    connect.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        let res = JSON.parse(JSON.stringify(result));
        closeMysql(connect);
        resolve(res);
      }
    });
  });
}




// 查询成功后关闭mysql
function closeMysql(connect) {
  connect.end((err) => {
    if (err) {
      console.log(`mysql关闭失败:${err}!`)
    } else {
      console.log('mysql关闭成功!')
    }
  })
}

// 模块导出语句的写法 用于将conMysqsl导出为模块的一个属性
exports.conMysql = conMysql