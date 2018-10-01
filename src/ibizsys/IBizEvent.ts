
/**
 * IBiz事件声明
 * 
 * @export
 * @enum {number}
 */
/**
 * IBiz事件声明
 *
 * @export
 * @enum {number}
 */
/**
 * IBiz事件声明
 *
 * @export
 * @enum {number}
 */
/**
 * IBiz事件声明
 *
 * @export
 * @enum {number}
 */
export enum IBizEvent {
    /**
     * 计数器变化事件
     *
     */
    COUNTERCHANGE = 'COUNTERCHANGE',
    /**
     * 视图控制器初始化完成
     * IBizViewController
     */
    IBizViewController_INITED = 'IBizViewController_INITED',
    /**
     * 视图控制器标题发生变化
     * IBizMainViewController
     */
    IBizMainViewController_CAPTIONCHANGED = 'IBizMainViewController_CAPTIONCHANGED',
    /**
     * 加载之前触发
     * IBizForm
     */
    IBizForm_BEFORELOAD = 'IBizForm_BEFORELOAD',
    /**
     * 表单保存完成
     * IBizForm
     */
    IBizForm_FORMSAVED = 'IBizForm_FORMSAVED',
    /**
     * 表单加载完成事件
     * IBizForm
     */
    IBizForm_FORMLOADED = 'IBizForm_FORMLOADED',
    /**
     * 表单删除完成
     * IBizForm
     */
    IBizForm_FORMREMOVED = 'IBizForm_FORMREMOVED',
    /**
     * 表单工作流启动完成
     * IBizForm
     */
    IBizForm_FORMWFSTARTED = 'IBizForm_FORMWFSTARTED',
    /**
     * 表单工作流提交完成
     * IBizForm
     */
    IBizForm_FORMWFSUBMITTED = 'IBizForm_FORMWFSUBMITTED',
    /**
     * 表单项更新之前
     * IBizForm
     */
    IBizForm_UPDATEFORMITEMBEFORE = 'IBizForm_UPDATEFORMITEMBEFORE',
    /**
     * 表单项已更新
     * IBizForm
     */
    IBizForm_UPDATEFORMITEMED = 'IBizForm_UPDATEFORMITEMED',
    /**
     * 表单权限发生变化
     * IBizForm
     */
    IBizEditForm_UIACTIONFINISHED = 'IBizEditForm_UIACTIONFINISHED',
    /**
     * 表单保存之前触发
     * IBizForm
     */
    IBizEditForm_FORMBEFORESAVE = 'IBizEditForm_FORMBEFORESAVE',
    /**
     * 表单保存错误触发
     * IBizForm
     */
    IBizEditForm_FORMSAVEERROR = 'IBizEditForm_FORMSAVEERROR',
    /**
     * 表单属性值变化事件
     * IBizForm
     */
    IBizForm_FORMFIELDCHANGED = 'IBizForm_FORMFIELDCHANGED',
    /**
     * 表单权限发生变化
     * IBizForm
     */
    IBizForm_DATAACCACTIONCHANGE = 'IBizForm_DATAACCACTIONCHANGE',
    /**
     * 选中值变化
     * IBizDataGrid
     */
    IBizDataGrid_SELECTIONCHANGE = 'IBizDataGrid_SELECTIONCHANGE',
    /**
     * 加载之前<后期要抽象出Store对象，由Store呼出此事件>
     * IBizDataGrid
     */
    IBizDataGrid_BEFORELOAD = 'IBizDataGrid_BEFORELOAD',
    /**
     * 加载完成<后期要抽象出Store对象，由Store呼出此事件>
     * IBizDataGrid
     */
    IBizDataGrid_LOADED = 'IBizDataGrid_LOADED',
    /**
     * 数据删除成功以后
     * IBizDataGrid
     */
    IBizDataGrid_REMOVED = 'IBizDataGrid_REMOVED',
    /**
     * 数据添加成功以后
     * IBizDataGrid
     */
    IBizDataGrid_ADDBATCHED = 'IBizDataGrid_ADDBATCHED',
    /**
     *
     * IBizDataGrid
     */
    IBizDataGrid_CHANGEEDITSTATE = 'IBizDataGrid_CHANGEEDITSTATE',
    /**
     * 界面行为
     * IBizMD
     */
    IBizMD_UIACTION = 'IBizMD_UIACTION',
    /**
     * 双击行
     * IBizDataGrid
     */
    IBizDataGrid_ROWDBLCLICK = 'IBizDataGrid_ROWDBLCLICK',
    /**
     * 单击行
     * IBizDataGrid
     */
    IBizDataGrid_ROWCLICK = 'IBizDataGrid_ROWCLICK',
    /**
     * 搜索表单重置事件
     * IBizSearchForm
     */
    IBizSearchForm_FORMRESETED = 'IBizSearchForm_FORMRESETED',
    /**
     * 搜索表单搜索事件
     * IBizSearchForm
     */
    IBizSearchForm_FORMSEARCHED = 'IBizSearchForm_FORMSEARCHED',
    /**
     * 数据激活<例如：表格行双击>
     * IBizMDViewController
     */
    IBizMDViewController_DATAACTIVATED = 'IBizMDViewController_DATAACTIVATED',
    /**
     * 数据选择变化
     * IBizMDViewController
     */
    IBizMDViewController_SELECTIONCHANGE = 'IBizMDViewController_SELECTIONCHANGE',
    /**
     * 表单项值变化
     * IBizField
     */
    IBizField_VALUECHANGED = 'IBizField_VALUECHANGED',
    /**
     * 数据视图部件行选中
     * IBizDataView
     */
    IBizDataView_SELECTIONCHANGE = 'IBizDataView_SELECTIONCHANGE',
    /**
     * 数据视图部件行激活
     * IBizDataView
     */
    IBizDataView_DATAACTIVATED = 'IBizDataView_DATAACTIVATED',
    /**
     * 数据关系区部件加载完成
     * IBizDRBar
     */
    IBizDRBar_DRBARLOADED = 'IBizDRBar_DRBARLOADED',
    /**
     * 数据关系区部件加载完成
     * IBizDRBar
     */
    IBizDRTab_SELECTCHANGE = 'IBizDRTab_SELECTCHANGE',
    /**
     * 数据关系区部件选中变化
     * IBizDRBar
     */
    IBizDRBar_DRBARSELECTCHANGE = 'IBizDRBar_DRBARSELECTCHANGE',
    /**
     * 树导航部件加载完成
     * IBizTreeExpBar
     */
    IBizTreeExpBar_LOADED = 'IBizTreeExpBar_LOADED',
    /**
     * 树导航部件选中变化
     * IBizTreeExpBar
     */
    IBizTreeExpBar_SELECTIONCHANGE = 'IBizTreeExpBar_SELECTIONCHANGE',
    /**
     * 工作流航部件选中变化
     * IBizWFExpBar
     */
    IBizWFExpBar_SELECTIONCHANGE = 'IBizWFExpBar_SELECTIONCHANGE',
    /**
     * 应用菜单部件服务对象加载完成
     * IBizAppMenu
     */
    IBizAppMenu_LOADED = 'IBizAppMenu_LOADED',
    /**
     * 应用菜单部件服务对象选中变化
     * IBizAppMenu
     */
    IBizAppMenu_MENUSELECTION = 'IBizAppMenu_MENUSELECTION',
    /**
     * 向导面板初始化完成
     * IBizWizardPanel
     */
    IBizWizardPanel_WIZARDINITED = 'IBizWizardPanel_WIZARDINITED',
    /**
     * 向导步骤完成
     * IBizWizardPanel
     */
    IBizWizardPanel_WIZARDFINISH = 'IBizWizardPanel_WIZARDFINISH',
    /**
     * 向导表单切换
     * IBizWizardPanel
     */
    IBizWizardPanel_WIZARDCHANGEFORM = 'IBizWizardPanel_WIZARDCHANGEFORM',
    /**
     * 图表部件服务对象加载完成
     * IBizChart
     */
    IBizChart_LOADED = 'IBizChart_LOADED',
    /**
     * 图表部件服务对象加载之前
     * IBizChart
     */
    IBizChart_BEFORELOAD = 'IBizChart_BEFORELOAD',
    /**
     * 图表部件服务对象双击
     * IBizChart
     */
    IBizChart_DBLCLICK = 'IBizChart_DBLCLICK',
    /**
     * 工具栏点击按钮事件
     * IBizToolbar
     */
    IBizToolbar_ITEMCLICK = 'IBizToolbar_ITEMCLICK',
    /**
     * 树控件数据选择
     * IBizTree
     */
    IBizTree_SELECTIONCHANGE = 'IBizTree_SELECTIONCHANGE',
    /**
     * 树控件数据激活
     * IBizTree
     */
    IBizTree_DATAACTIVATED = 'IBizTree_DATAACTIVATED',
    /**
     * 树控件上下文菜单
     * IBizTree
     */
    IBizTree_CONTEXTMENU = 'IBizTree_CONTEXTMENU',
    /**
     *
     * IBizTreeExpViewController
     */
    TreeExpViewControllerBase_REFRESHMODE_CURRENTNODE = 'TreeExpViewControllerBase_REFRESHMODE_CURRENTNODE',
    /**
     *
     * IBizTreeExpViewController
     */
    TreeExpViewControllerBase_REFRESHMODE_PARENTNODE = 'TreeExpViewControllerBase_REFRESHMODE_PARENTNODE',
    /**
     *
     * IBizTreeExpViewController
     */
    TreeExpViewControllerBase_REFRESHMODE_ALLNODE = 'TreeExpViewControllerBase_REFRESHMODE_ALLNODE',
    /**
     *
     * IBizTreeExpViewController
     */
    TreeExpViewControllerBase_REFRESHMODE_NONE = 'TreeExpViewControllerBase_REFRESHMODE_NONE',
    /**
     * 加载之前<后期要抽象出Store对象，由Store呼出此事件>
     * IBizReportPanel
     */
    IBizReportPanel_BEFORELOAD = 'IBizReportPanel_BEFORELOAD',
    /**
     * 加载完成<后期要抽象出Store对象，由Store呼出此事件>
     * IBizReportPanel
     */
    IBizReportPanel_LOADED = 'IBizReportPanel_LOADED',
    /**
     * 拾取数据视图面板数据选中
     * IBizPickupViewPanel
     */
    IBizPickupViewPanel_SELECTIONCHANGE = 'IBizPickupViewPanel_SELECTIONCHANGE',
    /**
     * 拾取数据视图面板数据激活
     * IBizPickupViewPanel
     */
    IBizPickupViewPanel_DATAACTIVATED = 'IBizPickupViewPanel_DATAACTIVATED',
    /**
     * 拾取数据视图面板所有数据
     * IBizPickupViewPanel
     */
	IBizPickupViewPanel_ALLDATA = 'IBizPickupViewPanel_ALLDATA',
	/**
	 * 多数据部件记载前
	 */
	IBizMDControl_BEFORELOAD = "IBizMDControl_BEFORELOAD",
	/**
	 * 多数据部件加载完毕
	 */
    IBizMDControl_LOADED = "IBizMDControl_LOADED",
    /**
     * 普通列表点击
     */
    IBizList_ROWCLICK = 'IBizList_ROWCLICK',
    /**
     * 选择列表点击
     */
    IBizPickerList_ROWCLICK = 'IBizPickerList_ROWCLICK',
    /**
     * 点击日历
     */
    IBizCalendar_CLICK = 'IBizCalendar_CLICK'
}