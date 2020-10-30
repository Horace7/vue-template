<template>
  <div>
    <div class="loading-wrapper" v-show="showLoading">
      <Loading></Loading>
    </div>
    <div class="login-wrapper" v-show="!showLoading">
      <img :src="imgUrl" alt="" width="100%" height="100%">
    </div>
    <div class="login-content">
      <div class="login-content_left">
        <div class="login-left_img">
          <i class="login-logo"></i>
          <i class="login-name"></i>
        </div>
      </div>
      <div class="login-content_right">
        <div class="login-title">{{ $t(`commons.login`) }}</div>
        <el-dropdown trigger="click" class="lang-select">
          <div class="login-lang"></div>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item, index) in langList">
              <el-dropdown-item v-text="item.lang" :key="index" :class="{ 'lang-selected': currentSelected === index }" @click.native="changeLocale(item.type, index)"></el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="login-mobile">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="accountSettingsForm"
            label-width="0">
            <el-form-item prop="mobile">
              <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号">
                <el-select class="el-select_code" slot="prepend" v-model="ruleForm.countryCode" placeholder="请选择">
                  <el-option v-for="(usernameCode, index) in codeList" :label="usernameCode.label" :value="usernameCode.value" :key="index"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="ruleForm.pwd" :type="passType" placeholder="请输入密码">
                <i class="iconfont icon-hide" v-show="passType === 'password'" style="cursor:pointer;" @click="passType = 'text'" slot="suffix"></i>
                <i class="el-icon-view" v-show="passType === 'text'" style="cursor:pointer;" @click="passType = 'password'" slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checkedPass" style="color:#a0a0a0;">{{ $t(`commons.autoLogin`) }}</el-checkbox>
              <div class="forget-password" @click="forgotPass">{{ $t(`commons.forget`) }}</div>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" @click="login('accountSettingsForm')">{{ $t(`commons.login`) }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/loading/Loading.vue'
import { encrypt } from '@/utils/crypto.js'
export default {
  name: 'Login',
  components: {
    Loading
  },
  data () {
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // <!--验证手机号是否合法-->
    const checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }
    return {
      accountSettingsForm: {
        verificationCode: '',
        username: ''
      },
      areaCode: '1',
      passType: 'password',
      showLoading: true,
      checkedPass: false,
      codeTime: 59, // 发送验证码倒计时
      sendMsgDisabled: false, // 是否显示获取验证码按钮
      imgUrl: require('../../assets/images/login.jpg'),
      ruleForm: {
        mobile: '18888178807',
        pwd: '123456',
        email: '',
        countryCode: '86',
        type: 'password'
      },
      rules: {
        email: [{ validator: checkEmail, trigger: 'change' }],
        pwd: [{ validator: validatePass, trigger: 'change' }],
        mobile: [{ validator: checkTel, trigger: 'change' }]
      },
      langList: [
        { lang: '中文', type: 'zh_CN' },
        { lang: 'English', type: 'en' }
      ],
      currentSelected: 0,
      codeList: [
        {
          label: '+86', value: '86'
        },
        {
          label: '+1', value: '1'
        },
        {
          label: '+82', value: '82'
        }
      ]
    }
  },
  mounted () {
    const bgImg = new Image()
    bgImg.src = this.imgUrl
    bgImg.onerror = () => {
      console.log('img onerror')
    }
    bgImg.onload = () => { // 图片加载成功后 去除loading
      this.showLoading = false
    }
    this.getCookie()
  },
  methods: {
    // 忘记密码
    forgotPass () {
      this.$router.push({ path: '/forgotPass' })
    },
    // 获取短信验证码
    async getMessageCode () {
      if (this.ruleForm.mobile === '') {
        this.$message.error('请先输入手机号')
        return false
      } else {
        if (this.checkMobile(this.ruleForm.mobile)) {
          try {
            const res = await this.$api.login.smsSend({ phone: this.ruleForm.mobile })
            if (res.code === 200) {
              this.$message.success('发送成功')
              const _this = this
              _this.sendMsgDisabled = true
              const codeInterval = window.setInterval(function () {
                if ((_this.codeTime--) <= 0) {
                  _this.codeTime = 59
                  _this.sendMsgDisabled = false
                  window.clearInterval(codeInterval)
                }
              }, 1000)
            }
          } catch (e) {
          }
        } else {
          this.$message.error('手机号格式错误')
        }
      }
    },
    // 验证手机号
    checkMobile (str) {
      const re = /^1\d{10}$/
      if (re.test(str)) {
        return true
      } else {
        return false
      }
    },
    // 登录
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.countryCode === '') {
            this.$message.error('请选择区号')
            return
          }

          // 加密
          let password = encrypt(this.ruleForm.pwd)
          password = password.toUpperCase()

          this.$store.dispatch('Login', { data: { ...this.ruleForm, pwd: password }, isKeep: this.checkedPass }).then((res) => {
            console.log(res)
            if (res) {
              this.showLoading = false
              this.$router.replace({ path: '/dashboard' })
            }
          }).catch(() => {
            this.showLoading = false
          })
        }
      })
    },
    // 设置cookie
    setCookie (name, pwd, exdays) {
      const exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'password' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie () {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            //  console.log(arr2[1])
            this.accountSettingsForm.username = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'password') {
            // console.log(arr2[1])
            this.accountSettingsForm.verificationCode = arr2[1]
          }
        }
        this.checkedPass = true
      }
    },
    // 清除cookie
    clearCookie () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    // 切换语言
    changeLocale (type, index) {
      this.currentSelected = index
      localStorage.setItem('lang', type)
      this.$i18n.locale = type
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-content{
    width: 60%;
    height: 500px;
    border-radius: 4px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    .login-content_left{
      width: 50%;
      height: 500px;
      border-radius:4px 0 0 4px;
      float: left;
      background:rgba(255,255,255,0.6);
      box-shadow:0 20px 30px 0 rgba(0,0,0,0.1);
      .login-left_img{
        width: 200px;
        height: 200px;
        margin: 150px auto 0;
        .login-logo {
          background-image: url('../../assets/svg/login-logo.svg');
          width: 60px;
          height: 60px;
          float: left;
          margin-left: 70px;
          background-size: cover;
        }
        .login-name {
          width: 200px;
          height: 20px;
          float: left;
          background-image: url('../../assets/svg/login-name.svg');
          background-size: cover;
          margin-top: 30px;
        }
      }
    }
    .login-content_right{
      width: 50%;
      height:500px;
      background:rgba(255,255,255,1);
      border-radius:0 4px 4px 0;
      float: right;
      .login-title{
        width: 96px;
        height: 50px;
        font-size: 31px;
        font-weight: 600;
        color: rgba(33,33,69,1);
        line-height: 50px;
        margin-left: 30px;
        margin-top: 18px;
      }
      .login-tab{
        width: 76%;
        height: 30px;
        margin: 20px auto;
        text-align: center;
      }
      .login-mobile{
        width: 76%;
        margin: 20px auto;
        .message-code{
          color: #0D70E6;
        }
        .code-btn{
          position: absolute;
          right: 5px;
        }
        .login-btn{
          width: 100%;
          background: #224268;
          border: 0;color: #ffffff;
        }
        .forget-password{
          float: right;
          font-weight: 400;
          color: rgba(33,33,69,1);
          cursor: pointer;
        }
      }
      .lang-select{
        position: absolute;
        right: 15px;
        top: 10px;
        cursor: pointer;
        .login-lang{
          width: 20px;
          height: 20px;
          background: url("../../assets/images/login-lang.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  .lang-selected{
    color: #909399;
  }
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.login-wrapper img {
  position: absolute;
  z-index: 1;
}
.login {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
#login-form>input {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #fff;
  color: #333;
  border: 1px solid #7da9c7;
  outline: none;
  text-indent: 20px;
  font-size: 14px;
}
#login-form>button {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #1ab2ff;
  color: #fff;
  border: 1px solid #1ab2ff;
  outline: none;
  border-radius: 100px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.register {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  text-indent: 8px;
  color: #1ab2ff;
  cursor: pointer;
  display: inline-block;
}
.register:hover {
  color: #2c2fd6;
}
@media (max-width: 768px) {
  .login {
    max-width: 260px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }
}
</style>
