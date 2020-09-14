import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { query } from "../../utils/request";
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Flex } from 'layout-flex';
import PCDMContainer from "./Container";
import { uniqueObjList, sortObjList } from "../../utils/tool";
const {
  FlexItem
} = Flex;
const defaultDisable = {
  province: false,
  city: false,
  district: false
};
export default function PCDMultiple(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    handle,
    ...rest
  } = props;
  const {
    API = '/api/pcd/list',
    dataField = 'data',
    label: optLabel = 'name',
    value: optValue = 'id',
    disable = defaultDisable
  } = options;
  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [province, setProvince] = useState(null); // 当前点击的 省

  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState(null); // 当前点击的 市

  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState(null); // 当前点击的 区

  useDidMount(queryProvinceData);
  useEffect(_ => {
    if (province && !disable.city) {
      queryCityData(province);
      setCity([]);
      setDistrict([]);
      setCityList([]);
      setDistrictList([]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [province, disable]);
  useEffect(_ => {
    if (city && !disable.district) {
      queryDistrictData(city);
      setDistrict([]);
      setDistrictList([]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [city, disable]);

  function getData(queryData) {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace
      });
      setLoading(true);
      return query(fAPI, queryData).then(data => {
        const list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          return Promise.resolve(list);
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          return Promise.reject();
        }
      }).finally(_ => {
        setLoading(false);
      });
    }

    return Promise.resolve([]);
  }

  function queryProvinceData() {
    getData({}).then(data => {
      setProvinceList(data);
    });
  }

  function queryCityData(id) {
    // const find = provinceList.find(p => p.id === id);
    getData({
      type: 'c',
      pid: id
    }).then(data => {
      setCityList(data);
    });
  }

  function queryDistrictData(id) {
    getData({
      type: 'd',
      pid: id
    }).then(data => {
      setDistrictList(data);
    });
  }

  function handleSelectProvince(data) {
    setProvince(data);
  }

  function handleSelectCity(data) {
    setCity(data);
  }

  function handleSelectDistrict(data) {
    setDistrict(data);
  }

  function handleAppendToValue(data) {
    const formatList = data.map(item => {
      return { ...item,
        name: formatName(item)
      };
    });

    if (Array.isArray(value)) {
      onChange(sortObjList(uniqueObjList(value, formatList)));
    } else {
      onChange(formatList);
    }
  }

  function handleRemoteValue(data) {
    const vSet = new Set(data.map(i => i.id));
    onChange(value.filter(i => !vSet.has(i.id)));
  }

  function formatName(item) {
    if (item.pid) {
      if (item.type === 'c') {
        const find = provinceList.find(i => i.id === item.pid);
        return `${find.name}-${item.name}`;
      }

      if (item.type === 'd') {
        const find = cityList.find(i => i.id === item.pid);
        return `${formatName(find)}-${item.name}`;
      }
    }

    return item.name;
  }

  return /*#__PURE__*/React.createElement(Spin, {
    className: className,
    spinning: loading
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(PCDMContainer, {
    title: "\u5DF2\u9009\u62E9",
    operationName: "\u79FB\u9664\u9009\u4E2D\u6570\u636E",
    keepSelected: true // onClick={onChange}
    ,
    onSelect: handleRemoteValue,
    listData: value,
    optLabel: optLabel,
    optValue: optValue
  })), disable.province ? null : /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(PCDMContainer, {
    title: "\u7701",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u7701",
    onClick: handleSelectProvince,
    onSelect: handleAppendToValue,
    listData: provinceList,
    optLabel: optLabel,
    optValue: optValue
  })), disable.city ? null : /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(PCDMContainer, {
    title: "\u5E02",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u5E02",
    onClick: handleSelectCity,
    onSelect: handleAppendToValue,
    listData: cityList,
    optLabel: optLabel,
    optValue: optValue
  })), disable.district ? null : /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(PCDMContainer, {
    title: "\u533A",
    operationName: "\u6DFB\u52A0\u9009\u4E2D\u533A",
    onClick: handleSelectDistrict,
    onSelect: handleAppendToValue,
    listData: districtList,
    optLabel: optLabel,
    optValue: optValue
  }))));
}