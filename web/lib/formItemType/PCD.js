function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { query } from "../utils/request";
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Flex } from 'layout-flex';
import { getPageData } from 'zero-element/lib/Model';
const Option = Select.Option;
export default function PCD(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    handle,
    formdata,
    ...rest
  } = props;
  const {
    API = '/api/pcd/list',
    dataField = 'data',
    label: optLabel = 'name',
    value: optValue = 'id',
    map = {
      p: 'province',
      c: 'city',
      d: 'district'
    }
  } = options;
  const {
    onSaveOtherValue
  } = handle;
  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [province, setProvince] = useState({
    key: -1,
    label: ''
  });
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState({
    key: -1,
    label: ''
  });
  const [districtList, setDistrictList] = useState([]);
  const [district, setDistrict] = useState({
    key: -1,
    label: ''
  });
  useDidMount(queryProvinceData);
  useEffect(_ => {// TODO init defaultValue
  }, [formdata]);
  useEffect(_ => {
    if (province.key) {
      queryCityData(province.key);
      setCity({
        key: -1,
        label: ''
      });
      setDistrict({
        key: -1,
        label: ''
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [province]);
  useEffect(_ => {
    if (city.key) {
      queryDistrictData(city.key);
      setDistrict({
        key: -1,
        label: ''
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [city]);

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

  function queryCityData(p) {
    getData({
      type: 'c',
      pid: p
    }).then(data => {
      setCityList(data);
    });
  }

  function queryDistrictData(p) {
    getData({
      type: 'd',
      pid: p
    }).then(data => {
      setDistrictList(data);
    });
  }

  function handlePChange(item) {
    setProvince(item);
    onSaveOtherValue(map.p, item.label);
  }

  function handleCChange(item) {
    setCity(item);
    onSaveOtherValue(map.c, item.label);
  }

  function handleDChange(item) {
    setDistrict(item);
    onSaveOtherValue(map.d, item.label);
  }

  return /*#__PURE__*/React.createElement(Spin, {
    className: className,
    spinning: loading
  }, /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(Select, _extends({
    labelInValue: true,
    onChange: handlePChange,
    value: province
  }, rest), provinceList.map(opt => /*#__PURE__*/React.createElement(Option, {
    key: opt[optValue],
    value: opt[optValue]
  }, opt[optLabel]))), /*#__PURE__*/React.createElement(Select, _extends({
    labelInValue: true,
    onChange: handleCChange,
    value: city
  }, rest), cityList.map(opt => /*#__PURE__*/React.createElement(Option, {
    key: opt[optValue],
    value: opt[optValue]
  }, opt[optLabel]))), /*#__PURE__*/React.createElement(Select, _extends({
    labelInValue: true,
    onChange: handleDChange,
    value: district
  }, rest), districtList.map(opt => /*#__PURE__*/React.createElement(Option, {
    key: opt[optValue],
    value: opt[optValue]
  }, opt[optLabel])))));
}