// Generated by Framer (c3ab1ed)
import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{addFonts,addPropertyControls,ControlType,cx,useVariantState,withCSS}from"framer";import{LayoutGroup,motion}from"framer-motion";import*as React from"react";const cycleOrder=["YX5PhU6rJ","gCPvl8xZE"];const variantClassNames={gCPvl8xZE:"framer-v-1cr8kca",YX5PhU6rJ:"framer-v-zsem5"};function addPropertyOverrides(overrides,...variants){const nextOverrides={};variants===null||variants===void 0?void 0:variants.forEach(variant=>variant&&Object.assign(nextOverrides,overrides[variant]));return nextOverrides;}const humanReadableVariantMap={Close:"gCPvl8xZE",Open:"YX5PhU6rJ"};const transitions={default:{damping:60,delay:0,duration:.3,ease:[.44,0,.56,1],mass:1,stiffness:500,type:"spring"}};const BASE62="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function useRandomID(){const ref=React.useRef(null);if(ref.current===null){ref.current=Array(5).fill(0).map(()=>BASE62[Math.floor(Math.random()*BASE62.length)]).join("");}return ref.current;}const Component=/*#__PURE__*/ React.forwardRef(function({id,style:externalStyle={},className,width,height,layoutId,variant:outerVariant="YX5PhU6rJ",...restProps},ref){const outerVariantId=humanReadableVariantMap[outerVariant];const variant=outerVariantId||outerVariant;const{baseVariant,classNames,gestureVariant,setGestureState,setVariant,transition,variants}=useVariantState({cycleOrder,defaultVariant:"YX5PhU6rJ",transitions,variant,variantClassNames});const layoutDependency=variants.join("-")+restProps.layoutDependency;const defaultLayoutId=useRandomID();const{pointerEvents,...style}=externalStyle;return /*#__PURE__*/ _jsx(LayoutGroup,{id:layoutId!==null&&layoutId!==void 0?layoutId:defaultLayoutId,children:/*#__PURE__*/ _jsx(motion.div,{"data-framer-generated":true,initial:variant,animate:variants,onHoverStart:()=>setGestureState({isHovered:true}),onHoverEnd:()=>setGestureState({isHovered:false}),onTapStart:()=>setGestureState({isPressed:true}),onTap:()=>setGestureState({isPressed:false}),onTapCancel:()=>setGestureState({isPressed:false}),className:cx("framer-Tt5sc",classNames),style:{display:"contents",pointerEvents:pointerEvents!==null&&pointerEvents!==void 0?pointerEvents:undefined},children:/*#__PURE__*/ _jsxs(motion.div,{...restProps,className:cx("framer-zsem5",className),"data-framer-name":"Open",layoutDependency:layoutDependency,layoutId:"YX5PhU6rJ",ref:ref,style:{rotate:-90,...style},transition:transition,variants:{gCPvl8xZE:{rotate:90}},...addPropertyOverrides({gCPvl8xZE:{"data-framer-name":"Close"}},baseVariant,gestureVariant),children:[/*#__PURE__*/ _jsx(motion.div,{className:"framer-1knt2b5","data-framer-name":"Rectangle 26",layoutDependency:layoutDependency,layoutId:"LaAqKz1uM",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-wuukac","data-framer-name":"Rectangle 27",layoutDependency:layoutDependency,layoutId:"cEi8r3N2S",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-gnw9qu","data-framer-name":"Rectangle 28",layoutDependency:layoutDependency,layoutId:"nckRREhiU",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-11n29dc","data-framer-name":"Rectangle 29",layoutDependency:layoutDependency,layoutId:"CTvFQ5lMt",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-aka468","data-framer-name":"Rectangle 30",layoutDependency:layoutDependency,layoutId:"G5vmjWKYJ",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-juqp5d","data-framer-name":"Rectangle 31",layoutDependency:layoutDependency,layoutId:"hi1_8090V",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-lih4rq","data-framer-name":"Rectangle 32",layoutDependency:layoutDependency,layoutId:"cy_F7OxyE",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-1m41pb5","data-framer-name":"Rectangle 33",layoutDependency:layoutDependency,layoutId:"kKCqGDPZ1",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-15kl7e3","data-framer-name":"Rectangle 34",layoutDependency:layoutDependency,layoutId:"P8pf7A9Dx",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-htn2hh","data-framer-name":"Rectangle 35",layoutDependency:layoutDependency,layoutId:"Y6nGg6apd",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-wublmf","data-framer-name":"Rectangle 36",layoutDependency:layoutDependency,layoutId:"Q7G7HiQP2",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-1skzixe","data-framer-name":"Rectangle 37",layoutDependency:layoutDependency,layoutId:"vDcT5XE1d",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-1gpgnp9","data-framer-name":"Rectangle 38",layoutDependency:layoutDependency,layoutId:"iuBKblX9T",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-161e0hm","data-framer-name":"Rectangle 39",layoutDependency:layoutDependency,layoutId:"dmEityGcu",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-c0sfot","data-framer-name":"Rectangle 40",layoutDependency:layoutDependency,layoutId:"SjBqK_O6n",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-ueaave","data-framer-name":"Rectangle 41",layoutDependency:layoutDependency,layoutId:"BBnDMjSmp",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-17luovj","data-framer-name":"Rectangle 42",layoutDependency:layoutDependency,layoutId:"rPKPAKnxK",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-1lr7r2w","data-framer-name":"Rectangle 43",layoutDependency:layoutDependency,layoutId:"N8I9UTUue",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-1xcuean","data-framer-name":"Rectangle 44",layoutDependency:layoutDependency,layoutId:"HnK2R8yvL",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-oorzvl","data-framer-name":"Rectangle 45",layoutDependency:layoutDependency,layoutId:"KqfoTlYve",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition}),/*#__PURE__*/ _jsx(motion.div,{className:"framer-zu1fq7","data-framer-name":"Rectangle 46",layoutDependency:layoutDependency,layoutId:"dJwkCu3f2",style:{backgroundColor:"rgb(100, 149, 237)"},transition:transition})]})})});});const css=['.framer-Tt5sc [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none;}',"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",".framer-Tt5sc * { box-sizing: border-box; }",".framer-Tt5sc .framer-zsem5 { height: 28px; overflow: visible; position: relative; width: 16px; }",".framer-Tt5sc .framer-1knt2b5 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 13px; overflow: hidden; position: absolute; top: 0px; width: 3px; }",".framer-Tt5sc .framer-wuukac { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 12px; overflow: hidden; position: absolute; top: 1px; width: 3px; }",".framer-Tt5sc .framer-gnw9qu { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 11px; overflow: hidden; position: absolute; top: 3px; width: 3px; }",".framer-Tt5sc .framer-11n29dc { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 9px; overflow: hidden; position: absolute; top: 4px; width: 3px; }",".framer-Tt5sc .framer-aka468 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 8px; overflow: hidden; position: absolute; top: 5px; width: 3px; }",".framer-Tt5sc .framer-juqp5d { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 7px; overflow: hidden; position: absolute; top: 6px; width: 3px; }",".framer-Tt5sc .framer-lih4rq { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 5px; overflow: hidden; position: absolute; top: 8px; width: 3px; }",".framer-Tt5sc .framer-1m41pb5 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 4px; overflow: hidden; position: absolute; top: 9px; width: 3px; }",".framer-Tt5sc .framer-15kl7e3 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 3px; overflow: hidden; position: absolute; top: 10px; width: 3px; }",".framer-Tt5sc .framer-htn2hh { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 1px; overflow: hidden; position: absolute; top: 11px; width: 3px; }",".framer-Tt5sc .framer-wublmf { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 0px; overflow: hidden; position: absolute; top: 13px; width: 3px; }",".framer-Tt5sc .framer-1skzixe { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 1px; overflow: hidden; position: absolute; top: 14px; width: 3px; }",".framer-Tt5sc .framer-1gpgnp9 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 3px; overflow: hidden; position: absolute; top: 15px; width: 3px; }",".framer-Tt5sc .framer-161e0hm { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 4px; overflow: hidden; position: absolute; top: 17px; width: 3px; }",".framer-Tt5sc .framer-c0sfot { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 5px; overflow: hidden; position: absolute; top: 18px; width: 3px; }",".framer-Tt5sc .framer-ueaave { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 7px; overflow: hidden; position: absolute; top: 19px; width: 3px; }",".framer-Tt5sc .framer-17luovj { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 8px; overflow: hidden; position: absolute; top: 20px; width: 3px; }",".framer-Tt5sc .framer-1lr7r2w { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 9px; overflow: hidden; position: absolute; top: 22px; width: 3px; }",".framer-Tt5sc .framer-1xcuean { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 11px; overflow: hidden; position: absolute; top: 23px; width: 3px; }",".framer-Tt5sc .framer-oorzvl { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 12px; overflow: hidden; position: absolute; top: 24px; width: 3px; }",".framer-Tt5sc .framer-zu1fq7 { aspect-ratio: 1.047626009965647 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 3px); left: 13px; overflow: hidden; position: absolute; top: 25px; width: 3px; }"];/**
 * This is a generated Framer component.
 * @framerIntrinsicHeight 28
 * @framerIntrinsicWidth 16
 * @framerCanvasComponentVariantDetails {"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"gCPvl8xZE":{"layout":["fixed","fixed"]}}}
 */ const FramerrxX4DoBiY=withCSS(Component,css);export default FramerrxX4DoBiY;FramerrxX4DoBiY.displayName="Buttons";FramerrxX4DoBiY.defaultProps={height:28,width:16};addPropertyControls(FramerrxX4DoBiY,{variant:{options:["YX5PhU6rJ","gCPvl8xZE"],optionTitles:["Open","Close"],title:"Variant",type:ControlType.Enum}});addFonts(FramerrxX4DoBiY,[]);
export const __FramerMetadata__ = {"exports":{"Props":{"type":"tsType","annotations":{"framerContractVersion":"1"}},"default":{"type":"reactComponent","name":"FramerrxX4DoBiY","slots":[],"annotations":{"framerIntrinsicHeight":"28","framerCanvasComponentVariantDetails":"{\"propertyName\":\"variant\",\"data\":{\"default\":{\"layout\":[\"fixed\",\"fixed\"]},\"gCPvl8xZE\":{\"layout\":[\"fixed\",\"fixed\"]}}}","framerIntrinsicWidth":"16","framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./rxX4DoBiY.map