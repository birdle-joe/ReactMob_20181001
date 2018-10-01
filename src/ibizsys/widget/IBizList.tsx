import { IBizMDControl } from './IBizMDControl';
import { IBizEvent } from '../IBizEvent';
import { IBizUtil } from '../util/IBizUtil';
import React from 'react';
import { SwipeAction, ListView, Button, Icon, Radio, Checkbox } from 'antd-mobile';

export class IBizList extends IBizMDControl {

  private dataSource: any;
  private lv: any;
  public $oldSelectedDatas: any[] = [];
  public $isMultiselect: boolean = false;
  public $viewType: any;

  public $pagination: any = {
    // 当前页
    current: 1,
    // 总条数
    total: 0,
    // 每页显示的条数
    pageSize: 20,
    // 是否可以改变每页显示条数
    showSizeChanger: true,
    // 是否可以快捷跳转页数
    showQuickJumper: true,
    showTotal: (total: number, range: any[]) => {
      return `共${total}条`;
    },
    // 页码改变的回调
    onChange: (current) => {
      this.$pagination.current = current;
      this.load();
    },
    // 每页显示条数发生改变时回调
    onShowSizeChange: (current, pageSize) => {
      this.$pagination.current = current;
      this.$pagination.pageSize = pageSize;
      this.load();
    },
    // 指定每页可以显示多少条配置
    pageSizeOptions: ['10', '20', '30', '50', '100']
  };


  constructor(props: any, context: any, opt: any) {
    super(props, context, opt);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    });

    this.dataSource = dataSource;
    this.$isMultiselect = this.props.multiSelect;
    this.$viewType = this.props.viewtype;
    this.$isLoading = true;

    if (this.props.oldSelected && this.props.oldSelected instanceof Function) {
      if (this.props.oldSelected()) {
        this.$oldSelectedDatas = this.props.oldSelected();
      }
    }

    this.$pagination.current=1;
    // this.rData=[];
  }


  public load(arg: any = {}): void {
    let opt: any = {};
    Object.assign(opt, arg);
    Object.assign(opt, { srfctrlid: this.getName(), srfaction: 'fetch' });
    if (!opt.start) {
      // Object.assign(opt, { start: (this.$pagination.current - 1) * this.$pagination.pageSize });
    }
    if (!opt.limit) {
      Object.assign(opt, { limit: (this.$pagination.current) * this.$pagination.pageSize });
    }

    Object.assign(opt, { sort: JSON.stringify(this.$gridSortField) });

    // 发送加载数据前事件
    this.fire(IBizEvent.IBizDataGrid_BEFORELOAD, opt);

    this.post(opt)
      .subscribe(
        (response: any = {}) => {
          if (!response.items || response.ret !== 0) {
            if (response.errorMessage) {
              this.showToast(this.$showErrorToast, '', response.errorMessage);
            }
            return;
          }
          this.$pagination.total = response.totalrow;
          this.fire(IBizEvent.IBizDataGrid_LOADED, response.items);
          this.fillDataSource(response.items);
        },
        error => {
          console.log(error.info);
        }
      );
  }


  public fillDataSource(items: any) {
   
    this.$items = this.rendererDatas(items);
    this.rData = { ...this.rData, ...this.$items };
    this.dataSource = this.dataSource.cloneWithRows(this.rData);
    this.$isLoading = false;
    this.$pagination.current++;
    this.tick();
  }

  public $gridSortField: any[] = [];

  private oldselect: any[] = [];
  /**
   * @returns
   * @memberof IBizList 列表绘制
   */
  public render() {

    const separator = (sectionID: any, rowID: any) => (
      <div key={rowID}
        style={{
          lineHeight: '50px',
          color: '#888',
          fontSize: 18,
          borderBottom: '1px solid #F6F6F6',
        }}
      >
      </div>
    );
    const row = (rowData: any, sectionID: any, rowID: any) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }} onClick={this.onListRowClick.bind(this, rowData)}>
          <div style={{ display: '-webkit-box', padding: '20px 0' }}>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}></div>
              <div><span style={{ fontSize: '20px', color: '#FF6E27' }}>{rowData.srfmajortext}</span></div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.dataSource}
        renderFooter={this.foot}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        onScroll={this.scroll}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        style={{
          height: document.documentElement.clientHeight,
          overflow: 'auto',
        }}
      />
    );
  }

  public onEndReached = (event: any) => {

    if (this.$isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.$isLoading = true;
    this.tick();
    setTimeout(() => {this.load();
    }, 500);
  }


  public foot = () => {
    return (<div style={{ padding: 30, textAlign: 'center' }}>
      {this.$isLoading ? 'Loading...' : 'Loaded'}
    </div>)
  }

  public scroll() {
    console.log('scroll');
  }

  private rdchecked;
  public onPikerSelectChange(value: any) {
    this.$oldSelectedDatas = [value];
    this.fire(IBizEvent.IBizPickerList_ROWCLICK, [value]);
  }

  public onListRowClick(rowdata, e) {
    this.fire(IBizEvent.IBizList_ROWCLICK, [rowdata]);
  }

  public onPress(rowdata, e) {
  }

  private rData: any[]=[];

  /**
   * @param {*} props 数据主键  
   * @memberof IBizList  删除列表数据
   */
  public remove(props: any): void {

    const params: any = {};
    Object.assign(params, { srfaction: 'remove', srfctrlid: 'mdctrl', srfkeys: props });
    this.post(params)
      .subscribe(
        response => {
          if (response.ret === 0) {
            this.load({});
            this.fire(IBizEvent.IBizDataGrid_REMOVED, {});
            if (response.info && response.info !== '') {
              this.showToast(this.$showSuccessToast, '', '删除成功!');
            }
            this.$selection = [];
            IBizUtil.processResult(response);
          } else {
            this.showToast(this.$showErrorToast, '', '删除数据失败,' + response.info);
          }
        },
        error => {
          this.showToast(this.$showErrorToast, '', '删除数据失败');
        });
  }


  public rd_inArray($event): boolean {
    let i: number = 0;
    if (this.$oldSelectedDatas.find((value: any, index, arr) => {
      let judge = Object.is(value.srfmajortext, $event.srfmajortext);
      if (judge) {
        i = index;
        return true;
      }
      return false;
    })
    ) {
      return true;
    } else {
      return false;
    }
  }

  public cb_inArray($event): boolean {
    let i: number = 0;
    if (this.$oldSelectedDatas.find((value: any, index, arr) => {
      let judge = Object.is(value.srfkey, $event.srfkey);
      if (judge) {
        i = index;
        return true;
      }
      return false;
    })
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onMultiPikerSelectChange($event): void {
    let i: number = 0;
    if (this.$oldSelectedDatas.find((value: any, index, arr) => {
      let judge = Object.is(value.srfkey, $event.srfkey);
      if (judge) {
        i = index;
        return true;
      }
      return false;
    })
    ) {
      this.$oldSelectedDatas.splice(i, 1);
      this.tick();
    } else {
      this.$oldSelectedDatas.push($event);
      this.tick();
    }
    this.fire(IBizEvent.IBizPickerList_ROWCLICK, this.$oldSelectedDatas);
  }
}