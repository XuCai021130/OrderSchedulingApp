// 导入
// 中间件express模块
const express = require('express')
const bodyParser = require('body-parser')
//bcrypt 密码加密
const bcrypt = require('bcryptjs');

const dayjs = require('dayjs');


const multiparty = require('connect-multiparty');
let { conMysql } = require('./mysql');

// 创建统一的返回报文对象 生成Response类定义 返回状态,显示内容等
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed
    this.msg = msg
    this.code = code
    this.data = data
  }
}

// 创建
const app = express()

// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// 处理 application/json
app.use(bodyParser.json())

// 处理 mutipart/form-data
app.use(multiparty())

// 设置跨域访问
const cors = require('cors')
app.use(cors())

// 测试接口能否正常调用
app.get('/info', (req, res) => {
  res.send('Hello shaoyahu!');
})

// MD5加密
// const crypto = require('crypto');
// var d = crypto.createHash('md5').update('123').digest('hex');
// console.log(d,"MD5");

// // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
// // userinfo.password = bcrypt.hashSync(userinfo.password, 10)
// var password = bcrypt.hashSync("123456", 10);
// console.log(password,"bcrypt");

// 测试数据库连接是否连通
app.get('/getUser', (req, res) => {
  let sql = 'select * from student';
  conMysql(sql).then(result => {
    // res.send(result)
    res.send({
      code: 200,
      data: result,
      message: "成功"
    })
  })
})

// 登录原版
// app.post('/login', (req, res) => {
//   let sql = `select * from userinfo where username = '${req.body.username}'`
//   conMysql(sql).then(result => {
//   // 用户输入的密码,和数据库中存储的密码进行对比,返回值是布尔值
//   const compareResult = bcrypt.compareSync(req.body.password,result[0].password);
//     if (result[0].password === req.body.password) {
//       let response = new Response(true, '登录成功', 200, result);
//       res.send(response)
//     } else {
//       let response = new Response(false, '用户名或密码错误', 400)
//       res.status(400).send(response)
//     }
//   }).catch(err => {
//     // network预览返回参数
//     let response = new Response(false, '用户不存在,请重新输入', 1100)
//     res.status(200).send(response)
//   })
// })


// 用户登录优化版 异步处理 async/await 
app.post('/login', async (req, res) => {
  try {
    let sql = `select * from userinfo where username = '${req.body.username}'`
    const result = await conMysql(sql);
    const compareResult = bcrypt.compareSync(req.body.password, result[0].password);
    // 密码通过true
    if (compareResult) {
      let response = new Response(true, '登录成功', 200, result);
      res.send(response)
    } else {
      let response = new Response(false, '用户名或密码错误', 400);
      res.status(400).send(response);
    }
  } catch (err) {
    if (err instanceof DatabaseError) {
      let response = new Response(false, '数据库查询失败', 1101);
      res.status(200).send(response);
    } else {
      let response = new Response(false, '用户不存在', 1100);
      res.status(200).send(response);
    }
  }
})

// 修改密码
app.post('/updatePassword', (req, res) => {
  let sql = `update userinfo set password = '${req.body.newPassword}' where username = '${req.body.username}'`
  conMysql(sql).then(result => {
    //  insert into 操作得到的 results 是一个对象，通过 results.affectedRows 属性可以判断新增数据是否成功。如：
    if (result.affectedRows == 1) {
      let response = new Response(true, '修改成功', 200, result)
      res.send(response)
    } else {
      let response = new Response(false, '修改失败,请稍后重试', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('数据库连接出错!')
  })
})

// 获取当前用户信息
app.get('/getUserInfo', (req, res) => {
  let sql = `select * from userinfo where username = '${req.query.username}'`
  conMysql(sql).then(result => {
    let response = new Response(true, '获取成功', 200, result)
    res.send(response)
  }).catch(err => {
    res.status(500).send('数据库连接出错!')
  })
})


// 新增文章  防止 SQL 注入攻击，使用参数化查询或预编译语句来替代直接拼接字符串
app.post('/articles', (req, res) => {

  const { name, body } = req.body; // 从请求体中获取 name 和 body 字段的值
  //  // 执行创建文章的逻辑，这里只是简单的在当前命令行打印  不会显示在浏览器中
  let sql = "INSERT INTO articles (name, body) VALUES (?, ?)";
  let values = [name, body];
  conMysql(sql, values).then(result => {
    let response = new Response(true, '文章创建成功', 200);
    res.send(response);
  }).catch(err => {
    console.error(err);
    // 返回错误响应
    res.status(500).send('数据库连接出错!');
  })

})

// 文章列表
app.get('/getArtList', (req, res) => {
  let sql = "select * from articles";
  conMysql(sql).then(result => {
    res.send({ code: 200, data: result, msg: "成功" });
  }).catch(err => {
    console.error(err);
    // res.status(500).send('数据库连接出错!');
    res.status(500).json({ err: '服务器内部错误' });
  })
})

// 删除文章 删除使用req.query
app.post('/deleteArticle', (req, res) => {
  // 通过使用?占位符，可以提高 SQL 语句的安全性，防止 SQL 注入攻击
  // let sql = `DELETE FROM articles WHERE id = ${req.query.id}`;
  let sql = "DELETE FROM articles WHERE id = ?";
  let id = req.query.id;
  conMysql(sql, id).then(result => {
    res.send({ code: 200, data: { result }, message: "删除成功" });
  }).catch(err => {
    res.status(500).json({ err: '服务器内部错误' });
  })
})

// 修改文章
app.post('/updateArticle', (req, res) => {
  let id = req.body.id;
  let newName = req.body.name;
  let newBody = req.body.body;
  let sql = `UPDATE articles SET name = ?, body = ? WHERE id = ?`;
  let values = [newName, newBody, id];
  conMysql(sql, values).then(result => {
    //  insert into 操作得到的 results 是一个对象，通过 results.affectedRows 属性可以判断新增数据是否成功。如：
    if (result.affectedRows == 1) {
      res.send({ code: 200, data: result, msg: "修改成功" });

    } else {
      let response = new Response(false, '修改失败,请稍后重试', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('数据库连接出错!')
  })
})


// 任务中心 订单列表
// app.get('/getTaskList', (req, res) => {
//   // 执行 SQL 查询
//   const sql = 'SELECT * FROM order_tasks';
//   conMysql.query(sql, (err, rows) => {
//     if (err) {
//       console.error('查询数据库失败:', err);
//       return res.status(500).json({ error: '服务器内部错误' });
//     }
//     // 查询成功，将结果发送到前端
//     res.json({ code: 200, data: rows, msg: '成功' });
//   });
// });




// 获取任务中心 订单列表
app.get('/getTaskList', (req, res) => {
  // let sql = "select * from order_tasks";
  let sql="SELECT * FROM order_tasks WHERE DATEDIFF(CURDATE(), contractDeliveryTime) < 45 AND amountDue =0 ORDER BY contractDeliveryTime"
  conMysql(sql).then(result => {
    // 遍历数组，对多个时间字段进行格式转换
    const formattedResult = result.map(item => {
      console.log(item.contractConfirmationTime,6666);
      // if (item.contractConfirmationTime === "Invalid Date") {
      if (item.contractConfirmationTime === null) {
        item.contractConfirmationTime = ""; // 设置为空值
        item.contractDeliveryTime = dayjs(item.contractDeliveryTime).format('YYYY-MM-DD HH:mm:ss');
        item.plannedStartTime = dayjs(item.plannedStartTime).format('YYYY-MM-DD HH:mm:ss');
        item.plannedEndTime = dayjs(item.plannedEndTime).format('YYYY-MM-DD HH:mm:ss');
        
      } else {
        item.contractDeliveryTime = dayjs(item.contractDeliveryTime).format('YYYY-MM-DD HH:mm:ss');
        item.contractConfirmationTime = dayjs(item.contractConfirmationTime).format('YYYY-MM-DD HH:mm:ss');
        item.plannedStartTime = dayjs(item.plannedStartTime).format('YYYY-MM-DD HH:mm:ss');
        item.plannedEndTime = dayjs(item.plannedEndTime).format('YYYY-MM-DD HH:mm:ss');
      }
      return item;

    });
    res.send({ code: 200, data: formattedResult, msg: "成功" });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ err: '服务器内部错误' });
  })
})

// 启动
app.listen(3000, () => {
  console.log('服务器已启动 http://127.0.0.1:' + 3000)
})
