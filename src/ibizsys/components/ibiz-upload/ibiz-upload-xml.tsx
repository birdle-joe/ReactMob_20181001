import React, { Component } from "react";
import { Upload, Button } from 'antd';
import { IBizEnvironment } from "../../../environments/IBizEnvironment";
import { IBizNotification } from "../../util/IBizNotification";
import './ibiz-upload.less';
import { List, Badge, Icon } from "antd-mobile";
import { IBizLoading } from "../ibiz-loading/ibiz-loading";
import { IBizUtil } from "src/ibizsys/util/IBizUtil";

interface IBizUploadProps {
    /**
     * 是否启用
     *
     * @type {boolean}
     * @memberof IBizUploadProps
     */
    disabled?: boolean;
    /**
     * 值
     *
     * @type {*}
     * @memberof IBizUploadProps
     */
    fileList: any;
    /**
     * 值变化
     *
     * @memberof IBizUploadProps
     */
    onChange: (data: any[]) => void;
}

export class IBizUpload extends Component<IBizUploadProps> {
    /**
     * 已上传的文件列表
     *
     * @private
     * @type {any[]}
     * @memberof IBizUpload
     */
    private $fileList: any[] = [];

    public componentWillReceiveProps(nextProps): void {
        const { fileList } = nextProps;
        if (fileList && Array.isArray(fileList)) {
            this.$fileList = fileList;
        } else if (fileList && typeof fileList === 'string') {
            try {
                // this.$fileList = JSON.parse(fileList);
                this.$fileList = IBizUtil.loadXMLToJson(fileList);
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * 文件上传发生变化时
     *
     * @private
     * @memberof IBizUpload
     */
    private onChange = ({ file, fileList }) => {
        
        switch (file.status) {
            case 'done':
                const res = file.response;
                if (res && res.ret === 0) {
                    this.$fileList.push(...res.files);
                    this.dataChange();
                }
                break;
            case 'error':
                IBizNotification.error('upload error', `${file.name}文件上传失败`);
                break;
        }
        this.tick();
    }

    /**
     * 删除
     *
     * @private
     * @memberof IBizUpload
     */
    private onRemove = (file) => {
        this.$fileList.some((item, index) => {
            if (Object.is(item.id, file.id)) {
                this.$fileList.splice(index, 1);
                this.dataChange();
                return true;
            }
            return false;
        });
        this.tick();
    }

    /**
     * 通知父组件数据发生改变
     *
     * @private
     * @memberof IBizUpload
     */
    private dataChange(): void {
        const { onChange } = this.props;
        if (onChange) {
            // onChange(this.$fileList);
            onChange(IBizUtil.loadJsonToXML(this.$fileList));
        }
    }

    public render() {
        const { disabled } = this.props;
        const uploadConfig = {
            // 是否展示默认的已操作文件列表
            showUploadList: false,
            // 是否启用
            disabled,
            // 是否可以多选
            multiple: true,
            // 请求地址
            action: '..' + IBizEnvironment.UploadFile
        };

        const group = <div className="uploadfilebody">
            {this.$fileList.map((file) => {
                return   (<div key={file.id} style={{backgroundColor:'#e7f2fb', height:'40px' ,borderRadius:'5px' ,width:"-webkit-fit-content",textAlign:"center",margin: '5px'}}><div style={{ marginTop:'8px',padding:'8px'}}>
                <span style={{margin:'5px'}}><a href={IBizEnvironment.LocalDeve ? `${IBizEnvironment.ExportFile}?fileid=${file.id}` : `..${IBizEnvironment.ExportFile}?fileid=${file.id}`} target="_blank"  title={file.name}>{file.name}</a></span> 
                <i title="删除文件" className="fa fa-trash-o fa-lg" onClick={this.onRemove.bind(this, file)} /></div></div>)
            })}
        </div>


        const search = <Upload {...uploadConfig} onChange={this.onChange} onRemove={this.onRemove}>
            <i title="上传文件" className="fa fa-upload fa-lg"  />
        </Upload>;


        return (
                    <List.Item wrap><>{group}{search}</></List.Item>
        );
    }

    /**
     * 变更检测
     *
     * @private
     * @memberof IBizUpload
     */
    private tick(): void {
        this.setState({
            date: new Date()
        });
    }
}