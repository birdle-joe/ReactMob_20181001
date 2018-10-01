
import React from 'react';

import './ibiz-calendar.less';
function getImg() {
//   return `${window.global.config.static_file_host}/static/images/zrk_user_web/${path}/${name}.png`;
     return '';
}
export default class CalendarMain extends React.Component<any,any> {

  private isshow :boolean =false;

  constructor(props:any) {
    super(props)
    this.state = {
      current_day:this.props.year+''+this.props.month+''+ this.props.day,
      week_names: ['日', '一', '二', '三', '四', '五', '六'],
      current_rowIndex:'row_'+this.getCurrentRowIndex(),
      current_status:'top_arrow',
      isShowTaskList:false

    }
  }

  public componentWillReceiveProps(nextProps:any) {
    if(nextProps.year||nextProps.month||nextProps.day) {
      this.setState({
        current_day: nextProps.year+''+nextProps.month+''+nextProps.day
      });
    }
  }

  public getCurrentRowIndex(){
    let current_month_data = this.getCurrentMonth();
    for(let [index,data] of current_month_data.entries()){
       for(let value of data){
         if(value.day===this.props.day && value.month === this.props.month){
           return index;
         }
       }
    }
  }
  public getCurrentMonth() {
    let view_data = this.props.viewData;
    let current_month_data = view_data.months[this.props.month-1].days;
    let rowsInMonth:any = [];
    current_month_data.forEach((day:any, index:any) => {
      if (index % 7 === 0) {
        rowsInMonth.push(current_month_data.slice(index, index + 7))
      }
    });
    return rowsInMonth;
  }

  

  public _renderWeekHeader() {
    return (
      <div className="calendar_header_row" ref="header"   style={{height:'45px'}} >
        {
          this.state.week_names.map((name:any, index:any) => {
            return (
              <div className="calendar_box" key={index}>
                {name}
              </div>
            )
          })
        }
      </div>
    );
  }

  public  _renderMain() {
    let current_month_data = this.getCurrentMonth();
    return (
      <div className="main" ref='main' >
        {
          current_month_data.map((row:any, rowindex:any) => {
            return (
              <div key={rowindex} className="calendar_box_row" ref={'row_'+rowindex} style={{height:45}}>
                {
                  row.map((data:any, index:any) => {
                    return (
                      <div className={data.isCurrentMonth && !data._isFutureTime ? 'calendar_box_current_month' : 'calendar_box_other_month'}
                           key={data.All_date}
                           onClick={this.onDatePickListener.bind(this, data,'row_'+rowindex)}  
                      >
                        {
                          this._renderViewCurrentDay(data)
                        }
                        {data.taskList.map((task:any, taskIndex:any) => {
                            return (
                                      <div key={taskIndex} style={{width:'60%',height:'3px',backgroundColor:task.color, margin:"auto",marginTop:'3px'}}></div>
                                    )
                          })
                        }
                      </div>
                    );
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }

  public  _renderViewCurrentDay(data:any){
    if(this.state.current_day===(data.year+''+data.month+''+data.day)){
        if(data.isTodays){
          return (
            <div className="calendar_box_click_red">
              {data.day}
            </div>
          )
        }
        switch (data.flag){
          case 3:
          case 4:
          case 6:
          case 7:
            return (
              <div className="calendar_box_click_red">
                {data.day}
              </div>
            )
          default:
            return (
              <div className="calendar_box_click_blue">
                {data.day}
              </div>
            )
        }
    }else{
      return this._renderViewItem(data);
    }
  }

  public _renderViewItem(data:any){
    if(data.isGetReport){
      return (
        <div style={{ backgroundImage: `url('${getImg()}')`, backgroundSize: 'contain'}} className="calendar_box_hava_data">
          <span style={{color:'#fff'}}>{data.day}</span>
        </div>
      )
    }
    switch (data.flag){
      case 1:
        if(data.isTodays){
          return (
            <div className="calendar_box_click_red">
              {data.day}
            </div>
          )
        }else{
          return (
            <div style={{ backgroundImage: `url('${getImg()}')`, backgroundSize: 'contain'}} className="calendar_box_hava_data">
             {data.day}
            </div>
          )
        }
      case 2:
        if(data.isTodays){
          return (
            <div className="calendar_box_click_red">
              {data.day}
            </div>
          )
        }else{
          return (
            <div className="calendar_box_other_gray">
              {data.day}
            </div>
          )
        }

      case 3:
      case 4:
      case 6:
      case 7:
        return (
          <div style={{ backgroundImage: `url('${getImg()}')`, backgroundSize: 'contain'}} className="calendar_box_hava_data">
           {data.day}
          </div>
        )
      case 5:
      case 8:
        return (
          <div style={{ backgroundImage: `url('${getImg()}')`, backgroundSize: 'contain'}} className="calendar_box_hava_data">
            {data.day}
          </div>
        )
      case 9:
        return (
          <div className="calendar_box_furture">
            {data.day}
          </div>
        )
      default:
        if(data.isTodays){
          return (
            <div className="calendar_box_click_red">
              {data.day}
            </div>
          )
        }else{
          return (
            <div className="calendar_box_other_gray">
              {data.day}
            </div>
          )
        }

    }
  }

  public onDatePickListener(data:any,rowindex:any,evn:any) {
    evn.preventDefault();
      let days = data.year+''+data.month+''+data.day;
      console.log(days);
      if (days !== this.state.current_day && data.isCurrentMonth) {
          this.props.onDatePickListener(data.day);
          if (data.isHaveData) {
              this.props.onChangeDateListener(data);
          }
          this.isshow=!this.isshow;
          this.setState({
              current_day:days,
              current_rowIndex:rowindex,
              isShowTaskList:this.isshow
          });
          this.props.onChangeDateListener(data);
      }
  }

  public render() {
    return (
      <div className="calendar_layout" >
        {this._renderWeekHeader()}
        {this._renderMain()}
        {/* <div className={this.state.isShowTaskList?"showTaskList":"hiddenTaskList"}>图层隐藏或者显示</div> */}
        <div className="tag_layout">
            <div style={{width:'50%'}}>  <div className="calendar_box_hava_data" style={{margin:"auto" ,textAlign:"center"}}>教员计划</div>  </div>
            <div style={{width:'50%'}}>  <div className="calendar_box_click_red" style={{margin:"auto" ,textAlign:"center"}}>学员计划</div> </div>
        </div>
      </div>
    );
  }
}