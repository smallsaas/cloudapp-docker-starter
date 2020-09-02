
import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as CSet } from 'zero-element/lib/config/container';
import { set as LASet } from 'zero-element/lib/config/listAction';
import { set as FITSet } from 'zero-element/lib/config/formItemType';
import { set as AITSet } from 'zero-element/lib/config/actionItemType';
import { set as VTSet } from 'zero-element/lib/config/valueType';

  import LayoutSet_Empty from '@/../zero-antd-dep/layout/Empty';
import LayoutSet_BaseTitle from '@/../zero-antd-dep/layout/BaseTitle';
import LayoutSet_TitleContent from '@/../zero-antd-dep/layout/TitleContent';
import LayoutSet_Loading from '@/../zero-antd-dep/layout/Loading';
import LayoutSet_Alone from '@/../zero-antd-dep/layout/Alone';
import LayoutSet_Row from '@/../zero-antd-dep/layout/Row';
import LayoutSet_SearchLayout from '@/../zero-antd-dep/layout/SearchLayout';
import LayoutSet_Grid from '@/../zero-antd-dep/layout/Grid';
import LayoutSet_Content from '@/../zero-antd-dep/layout/Content';
import LayoutSet_Items from '@/../zero-antd-dep/layout/Items';
import CSet_Empty from '@/../zero-antd-dep/container/Empty';
import CSet_Table from '@/../zero-antd-dep/container/List/Table';
import CSet_ReportList from '@/../zero-antd-dep/container/List/ReportList';
import CSet_TreeTable from '@/../zero-antd-dep/container/List/TreeTable';
import CSet_ChildrenList from '@/../zero-antd-dep/container/List/ChildrenList';
import CSet_TreeList from '@/../zero-antd-dep/container/List/TreeList';
import CSet_AutoReport from '@/../zero-antd-dep/container/List/AutoReport';
import CSet_TableSelect from '@/../zero-antd-dep/container/List/TableSelect';
import CSet_ItemList from '@/../zero-antd-dep/container/List/ItemList';
import CSet_Search from '@/../zero-antd-dep/container/Form/Search';
import CSet_AutoReportSearch from '@/../zero-antd-dep/container/Form/AutoReportSearch';
import CSet_Form from '@/../zero-antd-dep/container/Form/Form';
import CSet_ChildrenForm from '@/../zero-antd-dep/container/Form/ChildrenForm';
import LASet_onRequest from '@/../zero-antd-dep/listAction/onRequest';
import FITSet_plain from '@/../zero-antd-dep/formItemType/Plain';
import FITSet_empty from '@/../zero-antd-dep/formItemType/Empty';
import FITSet_hidden from '@/../zero-antd-dep/formItemType/Hidden';
import FITSet_group from '@/../zero-antd-dep/formItemType/Group';
import FITSet_input from '@/../zero-antd-dep/formItemType/Input';
import FITSet_password from '@/../zero-antd-dep/formItemType/Password';
import FITSet_number from '@/../zero-antd-dep/formItemType/Number';
import FITSet_radio from '@/../zero-antd-dep/formItemType/Radio';
import FITSet_select from '@/../zero-antd-dep/formItemType/Select';
import FITSet_checkbox from '@/../zero-antd-dep/formItemType/Checkbox';
import FITSet_map from '@/../zero-antd-dep/formItemType/Map';
import FITSet_pcd from '@/../zero-antd-dep/formItemType/PCD';
import FITSet_captcha from '@/../zero-antd-dep/formItemType/Captcha';
import FITSet_date from '@/../zero-antd-dep/formItemType/Date/date';
import FITSet_week from '@/../zero-antd-dep/formItemType/Date/week';
import FITSet_month from '@/../zero-antd-dep/formItemType/Date/month';
import FITSet_range from '@/../zero-antd-dep/formItemType/Date/range';
import FITSet_tableSelect from '@/../zero-antd-dep/formItemType/TableSelect';
import FITSet_modalRadio from '@/../zero-antd-dep/formItemType/ModalRadio';
import FITSet_modalCheckbox from '@/../zero-antd-dep/formItemType/ModalCheckbox';
import FITSet_uploadImage from '@/../zero-antd-dep/formItemType/UploadImage';
import FITSet_uploadFile from '@/../zero-antd-dep/formItemType/UploadFile';
import FITSet_checkboxFetch from '@/../zero-antd-dep/formItemType/CheckboxFetch';
import FITSet_selectFetch from '@/../zero-antd-dep/formItemType/SelectFetch';
import FITSet_selectField from '@/../zero-antd-dep/formItemType/SelectField';
import FITSet_textArea from '@/../zero-antd-dep/formItemType/TextArea';
import FITSet_richText from '@/../zero-antd-dep/formItemType/RichText';
import FITSet_oneMary from '@/../zero-antd-dep/formItemType/OneMary';
import FITSet_numberRange from '@/../zero-antd-dep/formItemType/NumberRange';
import FITSet_pcdm from '@/../zero-antd-dep/formItemType/PCDM';
import AITSet_modal from '@/../zero-antd-dep/actionItemType/Modal';
import AITSet_request from '@/../zero-antd-dep/actionItemType/Request';
import AITSet_childrenModalAdd from '@/../zero-antd-dep/actionItemType/ChildrenModalAdd';
import AITSet_importExcel from '@/../zero-antd-dep/actionItemType/ImportExcel';
import AITSet_exportExcel from '@/../zero-antd-dep/actionItemType/ExportExcel';
import AITSet_tableCheckbox from '@/../zero-antd-dep/actionItemType/TableCheckbox';
import VTSet_plain from '@/../zero-antd-dep/valueType/plain';
import VTSet_map from '@/../zero-antd-dep/valueType/map';
import VTSet_image from '@/../zero-antd-dep/valueType/image';
import VTSet_tag from '@/../zero-antd-dep/valueType/tag';
import VTSet_currency from '@/../zero-antd-dep/valueType/currency';
import VTSet_percentage from '@/../zero-antd-dep/valueType/percentage';
import VTSet_ellipsis from '@/../zero-antd-dep/valueType/ellipsis';
import VTSet_inputNumber from '@/../zero-antd-dep/valueType/inputNumber';
import VTSet_inputText from '@/../zero-antd-dep/valueType/inputText';
import VTSet_inputSelect from '@/../zero-antd-dep/valueType/inputSelect';
import VTSet_inputSelectFetch from '@/../zero-antd-dep/valueType/inputSelectFetch';

LayoutSet({
'Empty': LayoutSet_Empty,
'BaseTitle': LayoutSet_BaseTitle,
'TitleContent': LayoutSet_TitleContent,
'Loading': LayoutSet_Loading,
'Alone': LayoutSet_Alone,
'Row': LayoutSet_Row,
'SearchLayout': LayoutSet_SearchLayout,
'Grid': LayoutSet_Grid,
'Content': LayoutSet_Content,
'Items': LayoutSet_Items,

});

CSet({
'Empty': CSet_Empty,
'Table': CSet_Table,
'ReportList': CSet_ReportList,
'TreeTable': CSet_TreeTable,
'ChildrenList': CSet_ChildrenList,
'TreeList': CSet_TreeList,
'AutoReport': CSet_AutoReport,
'TableSelect': CSet_TableSelect,
'ItemList': CSet_ItemList,
'Search': CSet_Search,
'AutoReportSearch': CSet_AutoReportSearch,
'Form': CSet_Form,
'ChildrenForm': CSet_ChildrenForm,

});

LASet({
'onRequest': LASet_onRequest,

});

FITSet({
'plain': FITSet_plain,
'empty': FITSet_empty,
'hidden': FITSet_hidden,
'group': FITSet_group,
'input': FITSet_input,
'password': FITSet_password,
'number': FITSet_number,
'radio': FITSet_radio,
'select': FITSet_select,
'checkbox': FITSet_checkbox,
'map': FITSet_map,
'pcd': FITSet_pcd,
'captcha': FITSet_captcha,
'date': FITSet_date,
'week': FITSet_week,
'month': FITSet_month,
'range': FITSet_range,
'table-select': FITSet_tableSelect,
'modal-radio': FITSet_modalRadio,
'modal-checkbox': FITSet_modalCheckbox,
'upload-image': FITSet_uploadImage,
'upload-file': FITSet_uploadFile,
'checkbox-fetch': FITSet_checkboxFetch,
'select-fetch': FITSet_selectFetch,
'select-field': FITSet_selectField,
'text-area': FITSet_textArea,
'rich-text': FITSet_richText,
'one-mary': FITSet_oneMary,
'number-range': FITSet_numberRange,
'pcdm': FITSet_pcdm,

});

AITSet({
'modal': AITSet_modal,
'request': AITSet_request,
'children-modal-add': AITSet_childrenModalAdd,
'import-excel': AITSet_importExcel,
'export-excel': AITSet_exportExcel,
'table-checkbox': AITSet_tableCheckbox,

});

VTSet({
'plain': VTSet_plain,
'map': VTSet_map,
'image': VTSet_image,
'tag': VTSet_tag,
'currency': VTSet_currency,
'percentage': VTSet_percentage,
'ellipsis': VTSet_ellipsis,
'input-number': VTSet_inputNumber,
'input-text': VTSet_inputText,
'input-select': VTSet_inputSelect,
'input-select-fetch': VTSet_inputSelectFetch,

});
