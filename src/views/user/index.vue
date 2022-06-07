<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="seusername" placeholder="用户名" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="outerVisible = true">
        增加
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="会员">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="余额" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">停用 </span>
          <span v-if="scope.row.status==1">正常 </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.Updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            更改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加会员" :visible.sync="outerVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账 号:">
          <el-input v-model="form.username" placeholder="账号" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="密 码:">
          <el-input v-model="form.password" placeholder="密码" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option v-for=" start in options" :key="start.value" :label="start.label" :value="start.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号码:">
          <el-input v-model="form.mobile" placeholder="手机号码" style="width: 200px;" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button @click="setadd" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, userdel, useradd } from '@/api/user'

export default {
  name: 'ExportZip',
  data() {
    return {
      list: null,
      seusername: '',
      listLoading: true,
      downloadLoading: false,
      outerVisible: false,
      options: [{
                value: 1,
                label: '正常'
              },
              {
                value: 2,
                label: '停用'
              }
              ],
      form: {
              username: '',
              password: '',
              status: 1,
              mobile: ''
              }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data } = await fetchList()
      this.list = data.items
      this.listLoading = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    setadd() {
      console.log(this.form)
      useradd(this.form).then(res=>{
        console.log(res)
      })
      outerVisible:true
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        }).then(() => {
                this.deluser( row, index )
                }).catch();
    },
    deluser(row, index) {
      userdel(row['id']).then((res) => {
        if (res) {
          if (res.code === 2000) {
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '成功删除:' + row['username']
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        }
      })
    }

  }
}
</script>
