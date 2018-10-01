import React, { Component } from "react";
import { IBizEnvironment } from "../../../environments/IBizEnvironment";
import './ibiz-image-upload.less';
import { Subject, Observable } from "rxjs";
import { IBizHttp } from "ibizsys";
import { ImagePicker } from "antd-mobile";
import { IBizLoading } from "../ibiz-loading/ibiz-loading";

interface IBizImageUploadProps {
    /**
     * 是否启用
     *
     * @type {boolean}
     * @memberof IBizImageUploadProps
     */
    disabled: boolean;
    /**
     * 文件列表
     *
     * @type {*}
     * @memberof IBizImageUploadProps
     */
    fileList: any;
    /**
     * 数据改变
     *
     * @memberof IBizImageUploadProps
     */
    onChange: (data: any) => void;
}

const data: any = [];

export class IBizImageUpload extends Component<IBizImageUploadProps> {

    private $fileList: any[] = [];

    private $files: any[] = [];

    public componentWillReceiveProps(nextProps): void {
        const { fileList } = nextProps;
        if (fileList && Array.isArray(fileList)) {

            this.$fileList = fileList;
            let files=this.setfiles(fileList);
            this.$files=files;


        } else if (fileList && typeof fileList === 'string') {
            try {
                this.$fileList = JSON.parse(fileList);
                let files=this.setfiles(this.$fileList);
                this.$files=files;

            } catch (error) {
                console.error(error);
            }
        }
    }

    public setfiles(files: any):[] {
        let $files: any = [];
        if (files) {
            files.map((file, index) => {
                let fileid = file.id;
                let filename = file.name;
                let f={id:fileid,name:filename,url:`${IBizEnvironment.ExportFile}?fileid=${fileid}`}
                $files.push(f);
                }
            );
        }
        return $files;
    }

    public onChange = (files: any, type: any, index: any) => {

        console.log(index);

        switch (type) {
            case 'add':
                this.savefile(files);
                break;
            case 'remove':
                this.removefile(files, index);
                break;
        }
    };


    public savefile = (files) => {

        let file = files[files.length - 1].file;
        let _this = this;

        this.postImgStream(IBizEnvironment.UploadFile, file).subscribe(res => {

            if (res && res.ret === 0) {
                _this.$fileList.push(...res.files);
                _this.$files = files;
                _this.dataChange();
                _this.tick();
            }

        }, error => {
            console.error('请求错误', error);
        });
    }

    private removefile = (files, index) => {

        if (typeof index !== undefined) {
            this.$fileList.splice(index, 1);
            this.$files = files;
            this.dataChange();
            this.tick();
        }
    }

    private dataChange(): void {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.$fileList);
        }
    }

    public onAddImageClick = () => {

    };


    public render() {

        return (
            <div>
                <ImagePicker
                    files={this.$files}
                    onChange={this.onChange}
                    // onImageClick={(index, fs) => console.log(index, fs)}
                    // selectable={files.length < 5}
                    selectable={this.$files.length < 1}
                    multiple={false}
                    onAddImageClick={this.onAddImageClick}
                />
            </div>
        );
    }

    public $ibizHttp: IBizHttp = IBizHttp.getInstance();

    public postImgStream(url: string, opt: any): Observable<any> {
        this.mask();
        const subject: Subject<any> = new Subject();
        this.$ibizHttp.postImgStream(url, opt).then((res) => {
            this.unmask();
            subject.next(res);
        }).catch((err) => {
            this.unmask();
            subject.error(err);
        });
        return subject.asObservable();
    }

    protected mask(): void {
        IBizLoading.getInstance().show("正在加载中");
    }

    protected unmask(): void {
       
        IBizLoading.getInstance().destroy();
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