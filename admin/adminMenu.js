const express = require('express')
const router = express.Router()
const util = require('util')
const asyncdb = require('../utils/mysqlUtil')
const logger = require('../utils/log').logger
const { check, validationResult } = require('express-validator')

router.get('/menu', async (req, res, next) => {
  try {
    const adminId = req.session.admin_id

    let sql = util.format('SELECT * FROM admin_user WHERE id = %d;',
      adminId)
    const result = await asyncdb.exec(sql)

    // check is user exist
    if (!result || result.length === 0) {
      return res.
        json({ result: false, msg: 'user not exist or wrong password!' })
    }

    const menuList = await getMenuListByRole(result[0]['role'])

    res.json({ result: true, menus_list: menuList })
  } catch (e) {
    next(e)
  }
})

router.get('/menu/list', async (req, res, next) => {
  try {
    let data = []

    const sql = 'select * from admin_menu;'
    const result = await asyncdb.exec(sql)
    if (!result || result.length === 0) {
      return res.json({ result: true, menus_list: [] })
    }

    for (let i = 0; i < result.length; i++) {
      data.push({
        'id': result[i]['id'],
        'title': result[i]['name'],
        'view_name': result[i]['view_name'],
        'menu_group': result[i]['menu_group'],
        'weight': result[i]['weight'],
      })
    }

    res.json({ result: true, menus_list: data })
  } catch (e) {
    next(e)
  }
})

router.get('/menu/list2', async (req, res, next) => {
  try {
    let data = []

    const sql = 'select * from admin_menu;'
    const result = await asyncdb.exec(sql)
    if (!result || result.length === 0) {
      return res.json({ result: true, menus_list: [] })
    }

    for (let i = 0; i < result.length; i++) {
      data.push({
        'id': result[i]['id'],
        'title': result[i]['name'],
        'view_name': result[i]['view_name'],
        'menu_group': result[i]['menu_group'],
        'weight': result[i]['weight'],
      })
    }

    res.json({ result: true, menus_list: data })
  } catch (e) {
    next(e)
  }
})

async function getMenuListByRole (role) {
  // 查询角色配置的菜单
  let roleMenu = []
  if (role > 0) {
    const sql = util.format('select menu_ids from admin_roles where id = %d;', role)
    roleMenu = (await asyncdb.exec(sql))[0]['menu_ids'].split(',')
    console.log('roleMenu', roleMenu)
  }

  const group = {}

  const sql = 'select * from admin_menu order by weight;'
  const menus = await asyncdb.exec(sql)
  for (const menu of menus) {
    // 判断权限
    if (role === -1 || roleMenu.includes(String(menu['id']))) {
      if (!group[menu['menu_group']]) {
        group[menu['menu_group']] = {
          name: menu['menu_group'],
          children: [],
        }
      }
      group[menu['menu_group']].children.push({
        name: menu['name'],
        url: menu['view_name'],
      })
    }
  }

  const menusList = []
  for (const k in group) {
    menusList.push(group[k])
  }

  return menusList
}

module.exports = router
