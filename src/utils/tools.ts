const fs = require('fs');
const path = require('path');


export function _getAllNames(level, dir) {
  let filesNameArr = [];
  // 用个hash队列保存每个目录的深度
  let mapDeep = {};
  mapDeep[dir] = 0;

  getMap(dir, mapDeep[dir]);
  // 先遍历一遍给其建立深度索引
  function getMap(dir, curIndex) {
    let files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    files.map(function (file) {
      let subPath = path.join(dir, file) //拼接为相对路径
      let stats = fs.statSync(subPath) //拿到文件信息对象
      // 必须过滤掉node_modules文件夹
      if (file != 'node_modules') {
        mapDeep[file] = curIndex + 1;
        if (stats.isDirectory()) { //判断是否为文件夹类型
          return getMap(subPath, mapDeep[file]); //递归读取文件夹
        }
      }
    });
  }

  filesNameArr.push(readdirs(dir, dir));

  function readdirs(dir, folderName) {
    let result = { //构造文件夹数据
      path: dir,
      name: path.basename(dir),
      title: path.basename(dir),
      key: dir,
      type: 'directory',
      deep: mapDeep[folderName],
      children: undefined
    }
    let files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    result.children = files.map(function (file) {
      let subPath = path.join(dir, file); //拼接为相对路径
      let stats = fs.statSync(subPath); //拿到文件信息对象
      if (stats.isDirectory()) { //判断是否为文件夹类型
        return readdirs(subPath, file); //递归读取文件夹
      }
      return { //构造文件数据
        path: subPath,
        name: file,
        type: 'file',
        title: file,
        key: subPath,
      }
    })
    return result; //返回数据
  }
  console.log(filesNameArr);
  return filesNameArr;
}
