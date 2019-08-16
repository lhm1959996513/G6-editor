<template>
  <div style="width:100%;height:100%;">
      <!-- 工具栏 -->
      <div id="toolbar" class="toolbar">
        <i data-command="undo" class="command el-icon el-icon-arrow-left" title="撤回"></i>
        <i data-command="redo" class="command el-icon el-icon-arrow-right" title="重做"></i>
        <i data-command="delete" class="command el-icon el-icon-delete" title="删除"></i>
        <i data-command="zoomOut" class="command el-icon el-icon-zoom-out" title="缩小"></i>
        <i data-command="zoomIn" class="command el-icon el-icon-zoom-in" title="放大"></i>
        <i data-command="save" class="command el-icon el-icon-upload" title="保存"></i>
      </div>
      <div id="headear">
        <div style="width:20%;height:100%;float:left;">
          <!-- 元素面板栏 -->
            <div id="itempannel" class="ph left">
              <div class="getItem" data-type="node" data-shape="flow-rect" data-size="120*48" data-label="常规节点" data-color="#1890FF">
                <img draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg"  alt="" srcset="">
              </div>
              <div class="getItem" data-type="node" data-shape="flow-circle" data-size="72*72" data-label="起止节点" data-color="#FA8C16">
                <img draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"  alt="" srcset="">
              </div>
              <div class="getItem" data-type="node" data-shape="flow-rhombus" data-size="80*72" data-label="分叉节点" data-color="#13C2C2">
                <img draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg"  alt="" srcset="">
              </div>
              <div class="getItem" data-type="node" data-shape="flow-capsule" data-size="80*48" data-label="模型节点" data-color="#722ED1">
                <img draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg"  alt="" srcset="">
              </div>
            </div>
        </div>
        <div style="width:60%;height:100%;float:left;">
        <!-- 主画布 -->
            <div style="height:100%;">
              <div id="page" class="ph"></div>
            </div>
        </div>
        <div class="Rright">
          <!-- 详细面板 -->
              <div id="detailpannel" class="detailpannel">
                <div data-status="node-selected" class="panel" id="node_detailpanel">
                  <div class="panel-title">属性详情</div>
                  <div class="block-container">
                    <span>节点名称</span>
                    <el-input v-model="nodeLabel" size="mini" @change="changeNodeLabel" placeholder="请输入名称"></el-input>
                    <span>节点编码</span>
                    <el-input v-model="code" size="mini" @change="codeChange" placeholder="请输入名称"></el-input>
                  </div>
                </div>
              </div>
              <!-- 缩略图 -->
              <div class="minimap">
                <div class="panel-title">缩略图</div>
                <div id="minimap"></div>
              </div>
        </div>
      </div>
      <el-dialog title="填写信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
  import G6Editor from '@antv/g6-editor'
  export default {
    data () {
      return {
        graph: null,
        nodeLabel: '',
        code: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.initG6Editor()
    },
    methods: {
      // 画布保存方法
      saveGraph() {
        console.log('11111111111')
        // 获取当前page
        const page = this.editor.getCurrentPage()
        console.log(page)
        // 保存画布
        const data = page.save()
        console.log(data)
        this.dialogFormVisible = true
      },
      codeChange (value) {
        const editor = this.editor
        editor.executeCommand(() => {
          const page = editor.getCurrentPage()
          const selectedItems = page.getSelected()
          selectedItems.forEach(item => {
            // console.log(item.id)
            page.update(item.id, {
              code: value
            })
          })
        })
      },
      // 修改Node的label
      changeNodeLabel(value) {
        const editor = this.editor
        editor.executeCommand(() => {
          const page = editor.getCurrentPage()
          const selectedItems = page.getSelected()
          selectedItems.forEach(item => {
            page.update(item.id, {
              label: value,
              code: this.code
            })
          })
        })
        this.code = ''
      },
      // 初始化
      initG6Editor() {
        const data = {
          edges:[
            {
              code: "1001",
              id: "e0ea5384",
              index: 1,
              label: "1",
              shape: "flow-polyline",
              source: "51fd9832",
              sourceAnchor: 2,
              target: "99a67724",
              targetAnchor: 0
            },
            {
              code: "1004",
              id: "0d337282",
              index: 4,
              label: "2",
              shape: "flow-polyline",
              source: "99a67724",
              sourceAnchor: 2,
              target: "e5b882ff",
              targetAnchor: 0,
            },
            {
              code: "1006",
              id: "d65d627c",
              index: 5,
              label: "3",
              shape: "flow-polyline",
              source: "e5b882ff",
              sourceAnchor: 2,
              target: "164ab0e3",
              targetAnchor: 0,
            },
            {
              code: "1008",
              id: "1ebc666b",
              index: 7,
              label: "4",
              shape: "flow-polyline",
              source: "e5b882ff",
              sourceAnchor: 1,
              target: "51fd9832",
              targetAnchor: 1,
            }
          ],
          nodes:[
            {
              code: "1002",
              color: "#FA8C16",
              id: "51fd9832",
              index: 0,
              label: "起止节点",
              shape: "flow-circle",
              size: "72*72",
              type: "node",
              x: 554.671875,
              y: -11
            },
            {
              code: "1003",
              color: "#722ED1",
              id: "99a67724",
              index: 2,
              label: "模型节点",
              shape: "flow-capsule",
              size: "80*48",
              type: "node",
              x: 554.671875,
              y: 156.5
            },
            {
              code: "1005",
              color: "#13C2C2",
              id: "e5b882ff",
              index: 3,
              label: "分叉节点",
              shape: "flow-rhombus",
              size: "80*72",
              type: "node",
              x: 554.171875,
              y: 302.5
            },
            {
              code: "1007",
              color: "#FA8C16",
              id: "164ab0e3",
              index: 6,
              label: "起止节点",
              shape: "flow-circle",
              size: "72*72",
              type: "node",
              x: 555.171875,
              y: 503.5
            }
          ]
        }
        // this
        const _this = this
        // G6Editor
        const editor = new G6Editor()
        editor._cfg._command.clipboard.push(data)
        // editor挂载到Vue
        this.editor = editor
        // Flow
        const Flow = G6Editor.Flow
        // Command
        const Command = G6Editor.Command
        
        // 定义Save命令
        Command.registerCommand('save', {
          // 命令是否进入队列，默认是 true
          queue: false,  
          // 命令是否可用
          enable(eidtor) {
            return true
          },
          // 正向命令
          execute(eidtor) {
            _this.saveGraph()
          },
          // 快捷键：Ctrl+shirt+s
          shortcutCodes : [['ctrlKey', 'shiftKey', 's']]
        })

        // 主画布
        // Mind 思维导图
        // Koni 网络图、拓扑图
        // Flow 流程图
        const page = new G6Editor.Flow({
          graph: {
            container: 'page'
          }
        })
        page.read(data)
        // G6Editor.Flow.reread(data)
        // 设置边样式，内置3种样式
        // flow-polylinels
        // flow-polyline-round
        // flow-smooth
        page.getGraph().edge({
          shape: 'flow-polyline'
        })

        // 自定义节点
        Flow.registerNode('customNode', {
          draw(item){
            const group = item.getGraphicGroup()
            const model = item.getModel()
            group.addShape('text', {
              attrs: {
                x: 0,
                y: 0,
                fill: '#333',
                text: model.label
              }
            })
            group.addShape('text', {
              attrs: {
                x: 0,
                y: 0,
                fill: '#333',
                text: ' ('+model.x+', '+model.y+') \n 原点是组的图坐标',
                textBaseline: 'top'
              }
            })
            
            return group.addShape('rect', {
              attrs: {
                x: 0,
                y: 0,
                width: 200,
                height: 300,
                stroke: 'red'
              }
            })
          }
        })

        // 元素面板栏
        const itempannel = new G6Editor.Itempannel({
          container: 'itempannel',
        })

        // 工具栏
        const toolbar = new G6Editor.Toolbar({
          container: 'toolbar',
        })

        // 详细面板
        const detailpannel = new G6Editor.Detailpannel ({
          container: 'detailpannel'
        })

        // 缩略图
        const minimap = new G6Editor.Minimap({
          container: 'minimap',
          height: 100,
          width: 200
        })
        // 组件挂载到Editor
        editor.add(page)
        editor.add(itempannel)
        editor.add(toolbar)
        editor.add(detailpannel)
        editor.add(minimap)
        // 获取当前page
        const currentPage = editor.getCurrentPage()
        // currentPage.getSelected(data)
        // this.editor.getCurrentPage().save(data)
        // 监听选择变化
        currentPage.on('afteritemselected', ev => {
          // 选择对象为Node节点
          if (ev.item.isNode) {
            // 获取属性
            const nm = ev.item.getModel()
            _this.nodeLabel = nm.label
          }
          if (ev.item.isNode) {
            // 获取属性
            const nm = ev.item.getModel()
            _this.code = nm.code
          }
          // 选择对象为Edge节点
          if (ev.item.isEdge) {
            // 获取属性
            const nm = ev.item.getModel()
            _this.nodeLabel = nm.label
          }
          // 选择对象为Edge节点
          if (ev.item.isEdge) {
            // 获取属性
            const nm = ev.item.getModel()
            _this.code = nm.code
          }
        })
      }
    },
  }
</script>

<style>
  .graph-container{
    height: 100% !important;
  }
  .wrap {
    border: 1px solid #eee;
    /* height: 833px; */
  }
  .ph {
    /* min-width: 400px; */
    min-height: 200px;
    height: 100%; 
  }
  .el-icon {
    font-size: 12px;
    margin-right:20px;
    cursor: pointer;
  }
  .el-icon:hover {
    color: blue
  }
  .toolbar {
    border: 1px solid #E9E9E9;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
    height: 42px;
    line-height: 42px;
    background: #fff;
  }
  .left {
     border-right: 1px solid #E6E9ED;
    background: #F7F9FB;
  }
  .left .getItem {
    float: left;
    width: 100px;
    height: 100px;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #headear{
    height: -webkit-calc(100% - 50px);
    height: -moz-calc(100% - 50px);
    height: calc(100% - 50px);
  }
  .right {
    border-left: 1px solid #eee;
    background: #fcfcfc;
    display: flex;
    flex-direction: column
  }
  .Rright{
    /* border-left: 1px solid #E6E9ED; */
    background: #F7F9FB;
    width:20%;height:100%;
    float:left;
  }
  .detailpannel {
    flex: 1;
  }
  .minimap {
    width: 20%;
    height: 176px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 3;
  }
  .panel-title {
    /* margin-top: 10px;
    margin-left: 10px;
    font-size: 12px; */
    font-size: 12px;
    height: 32px;
    border-top: 1px solid #DCE3E8;
    border-bottom: 1px solid #DCE3E8;
    background: #EBEEF2;
    color: #000;
    line-height: 28px;
    padding-left: 12px;
  }
  .block-container {
    padding: 10px;
  }
</style>
