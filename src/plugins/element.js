// element 按需引入
import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Card,
  Pagination,
  Dialog,
  Avatar,
  Button,
  ButtonGroup,
  Input,
  Table,
  TableColumn,
  Form,
  FormItem,
  Dropdown,
  Breadcrumb,
  BreadcrumbItem,
  Autocomplete,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  MessageBox,
  Message,
  Image,
  Checkbox,
  Calendar,
  Loading,
  Tree,
  Notification,
  DatePicker,
  Radio,
  RadioGroup,
  RadioButton,
  TimeSelect,
  TimePicker,
  Tabs,
  Select,
  Option,
  OptionGroup,
  TabPane,
  Tooltip,
  progress,
  Carousel,
  CarouselItem,
  Upload,
  ColorPicker,
  Popover
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Tree)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Popover)
Vue.use(Checkbox)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Dropdown)
Vue.use(Autocomplete)
Vue.use(DropdownMenu)
Vue.use(Avatar)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(Calendar)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(Image)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Loading.directive)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)
Vue.use(progress)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(ColorPicker)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
