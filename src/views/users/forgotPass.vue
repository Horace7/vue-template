<template>
  <div class="forgot-pwd">
    <div class="logo"></div>
    <div class="title">重置密码</div>
    <div class="content-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item v-show="activeIndex === 0" prop="mobile">
          <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号">
            <el-select class="el-select_code" slot="prepend" v-model="ruleForm.countrycode" placeholder="请选择">
              <el-option v-for="(usernameCode, index) in codeList" :label="usernameCode.label" :value="usernameCode.value" :key="index" />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <el-input v-model="ruleForm.smsCode" placeholder="请输入验证码" class="sms-ipt"></el-input>
          <el-button type="text" class="code-btn">
            <span class="message-code" v-if="!sendMsgDisabled" @click="getMessageCode">获取验证码</span>
            <span v-if="sendMsgDisabled">{{codeTime+'秒后获取'}}</span>
          </el-button>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input v-model="ruleForm.newPwd" type="password" placeholder="新密码" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input v-model="ruleForm.confirmPwd" type="password" placeholder="确认新密码" maxlength="16"></el-input>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button :type="typeName" class="submit" style="margin-left: 16px;" @click="changePwd">确定</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,16}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码由6-16位字母和数字组成，请输入正确格式'))
      } else {
        callback()
      }
    }
    const validateconfirmPwd = (rule, value, callback) => {
      const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{6,16}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次密码输入不一致'))
      } else if (!reg.test(value)) {
        callback(new Error('密码由6-16位字母和数字组成，请输入正确格式'))
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
      isSubmit: true, // 是否可提交
      typeName: 'info',
      ruleForm: {
        mobile: '',
        smsCode: '',
        newPwd: '',
        confirmPwd: '',
        countrycode: '86',
        email: ''
      },
      activeIndex: 0,
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
      ],
      sendMsgDisabled: false,
      codeTime: 59,
      rules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        newPwd: [{ validator: validatePwd, trigger: 'blur' }],
        mobile: [{ validator: checkTel, trigger: 'blur' }],
        confirmPwd: [{ validator: validateconfirmPwd, trigger: 'blur' }],
        smsCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 修改密码
    changePwd () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.countrycode === '') {
            this.$message.error('请选择区号')
            return false
          }

          this.$message.success('密码修改成功')
        }
      })
    },
    // 获取短信验证码
    async getMessageCode () {
      if (this.ruleForm.countrycode === '') {
        this.$message.error('请选择区号')
        return false
      } else if (this.ruleForm.mobile === '') {
        this.$message.error('请先输入手机号')
        return false
      } else {
        if (this.checkMobile(this.ruleForm.mobile)) {
          // 发送验证码
          this.smsCode()
        } else {
          this.$message.error('手机号格式错误')
        }
      }
    },
    async smsCode () {
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
    },
    // 验证手机号
    checkMobile (str) {
      const re = /^1\d{10}$/
      if (re.test(str)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.forgot-pwd{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .logo {
    width: 335px;
    height: 60px;
    margin: 100px auto 0;
  }
  .title {
    width: 335px;
    text-align: center;
    font-size: 24px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(33,33,69,1);
    margin: 60px auto 0;
  }
  .content-wrap {
    width: 335px;
    margin: 40px auto;
    text-align: center;
    .el-form {
      width: 100%;
      .code-btn{
        position: absolute;
        right: 5px;
      }
    }
    .btns {
      height: 40px;
      margin-top: 60px;
      .el-button {
        width: 120px;
        height: 40px;
        float: right;
      }
      .submit {
        border: none;
        background-color: #0D70E6;
        color: #fff;
      }
      .submit:hover {
        opacity: 0.9;
      }
      .submit:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
<style lang="less">
.forgot-pwd .el-form {
  .el-form-item__content {
    margin-left: 0!important;
  }
  .sms-ipt {
    .el-input__inner {
      padding-right: 90px;
    }
  }
}
</style>
