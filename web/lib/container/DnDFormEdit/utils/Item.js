let assigned = 1;
let fieldCount = 1;

class Item {
  constructor(obj) {
    const rst = { ...obj
    }; // 只有 layout 才有 tips

    if (obj.tips === undefined) {
      rst.options.field.value = `field_${fieldCount++}`;
    }

    rst.id = assigned++;
    return rst;
  }

}

function setInitId(id = 1, count = 1) {
  assigned = id;
  fieldCount = count;
}

export default Item;
export { assigned, fieldCount, setInitId };