function ArrayFunctions(props) {
    const valRules = props?.schemaType?.validation?.[0]?._rules || [];
    const max = valRules.find(r => r.flag === 'max')?.constraint;
    const total = props?.value?.length || 0;
    if (!isNaN(max) && total >= max) return null;
};

export default function ArrayMaxItems(props) {
    return props.renderDefault({ ...props, arrayFunctions: ArrayFunctions });
};