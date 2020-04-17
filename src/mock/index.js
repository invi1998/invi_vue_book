import Mock from 'mockjs'
import home from './bookHome'
import shelf from './bookShelf'
import list from './bookList'
import flatList from './bookFlatList'

//模拟前端以/book/home请求时，指向'./bookHome'里的模拟数据，以get方式请求，返回json数据。下面以此类推
Mock.mock(/\/book\/home/,'get',home)
Mock.mock(/\/book\/shelf/,'get',shelf)
Mock.mock(/\/book\/list/,'get',list)
Mock.mock(/\/book\/flat-ist/,'get',flatList)