const xlsx = require('node-xlsx');
const fs = require('fs');
/*
* [
  {
    "id": "p1",
    "name": "叱云南",
    "desc": "将军世家叱云家三公子，驻守边关大将军，狠厉果敢，深得将士爱戴。",
    "color": 1,
    "type": 1,
    "skill": [
      {
        "id": "p1-1",
        "name": "傲世",
        "desc": "攻击对方前排单体目标，造成物理伤害"
      }
    ]
  }
]
*
*
*
*
* */
const res = [];
const xlsxfile = "E:/data.xlsx";
const xlsxfile1 = "E:/cv.xlsx";
new Promise((resolve, reject) => {
    //解析xlsx
    let obj = xlsx.parse(xlsxfile);
    let obj1 = xlsx.parse(xlsxfile1);
    resolve([obj, obj1]);
}).then(res => {
    let kb = format(res[0][5].data, res[1][0].data);

    writeJson(kb)
});
const searchCv = (id, data) => {
    let name = '';
    for (let k = 1; k < data.length; k++) {
        if (data[k][0] == id) {
            name = data[k][2] || null;
        }
    }
    return name
};
const format = (data, data1) => {
    let num = 0;
    for (let k = 1; k < data.length; k++) {
        if (!!data[k][0]) {

            num++
            res.push({
                id: data[k][0],
                name: data[k][1],
                desc: data[k][2],
                color: data[k][3],
                type: data[k][5],
                cv: searchCv(data[k][0], data1),
                skill: [
                    {
                        skill_id: data[k][7],
                        name: data[k][8],
                        desc: data[k][9]
                    }
                ]
            })
        }
        else {
            // console.log(res, num, res[num - 1]);
            res[num - 1].skill.push(
                {
                    skill_id: data[k][7],
                    name: data[k][8],
                    desc: data[k][9]
                }
            )
        }
    }
    return res
}


function writeJson(params) {
    //现将json文件读出来
    fs.readFile('./role.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        const str = JSON.stringify(params);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./role.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}



