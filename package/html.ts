import render from "backend/html/render";
import { LumaJS } from "shared/luma";
import Hooks from "backend/html/hooks";
import { VNode, VNodeData } from "snabbdom";

type HostComponent = Pick<
  VNodeData,
  "props" | "attrs" | "class" | "style" | "on" | "dataset" | "key"
>;

declare global {
  namespace JSX {
    type Element = VNode;

    // Based on the tag list in github:DefinitelyTyped/DefinitelyTyped:React
    interface IntrinsicElements {
      // HTML
      a: HostComponent;
      abbr: HostComponent;
      address: HostComponent;
      area: HostComponent;
      article: HostComponent;
      aside: HostComponent;
      audio: HostComponent;
      b: HostComponent;
      base: HostComponent;
      bdi: HostComponent;
      bdo: HostComponent;
      big: HostComponent;
      blockquote: HostComponent;
      body: HostComponent;
      br: HostComponent;
      button: HostComponent;
      canvas: HostComponent;
      caption: HostComponent;
      cite: HostComponent;
      code: HostComponent;
      col: HostComponent;
      colgroup: HostComponent;
      data: HostComponent;
      datalist: HostComponent;
      dd: HostComponent;
      del: HostComponent;
      details: HostComponent;
      dfn: HostComponent;
      dialog: HostComponent;
      div: HostComponent;
      dl: HostComponent;
      dt: HostComponent;
      em: HostComponent;
      embed: HostComponent;
      fieldset: HostComponent;
      figcaption: HostComponent;
      figure: HostComponent;
      footer: HostComponent;
      form: HostComponent;
      h1: HostComponent;
      h2: HostComponent;
      h3: HostComponent;
      h4: HostComponent;
      h5: HostComponent;
      h6: HostComponent;
      head: HostComponent;
      header: HostComponent;
      hr: HostComponent;
      html: HostComponent;
      i: HostComponent;
      iframe: HostComponent;
      img: HostComponent;
      input: HostComponent;
      ins: HostComponent;
      kbd: HostComponent;
      keygen: HostComponent;
      label: HostComponent;
      legend: HostComponent;
      li: HostComponent;
      link: HostComponent;
      main: HostComponent;
      map: HostComponent;
      mark: HostComponent;
      menu: HostComponent;
      menuitem: HostComponent;
      meta: HostComponent;
      meter: HostComponent;
      nav: HostComponent;
      noscript: HostComponent;
      object: HostComponent;
      ol: HostComponent;
      optgroup: HostComponent;
      option: HostComponent;
      output: HostComponent;
      p: HostComponent;
      param: HostComponent;
      picture: HostComponent;
      pre: HostComponent;
      progress: HostComponent;
      q: HostComponent;
      rp: HostComponent;
      rt: HostComponent;
      ruby: HostComponent;
      s: HostComponent;
      samp: HostComponent;
      script: HostComponent;
      section: HostComponent;
      select: HostComponent;
      small: HostComponent;
      source: HostComponent;
      span: HostComponent;
      strong: HostComponent;
      style: HostComponent;
      sub: HostComponent;
      summary: HostComponent;
      sup: HostComponent;
      table: HostComponent;
      tbody: HostComponent;
      td: HostComponent;
      textarea: HostComponent;
      tfoot: HostComponent;
      th: HostComponent;
      thead: HostComponent;
      time: HostComponent;
      title: HostComponent;
      tr: HostComponent;
      track: HostComponent;
      u: HostComponent;
      ul: HostComponent;
      var: HostComponent;
      video: HostComponent;
      wbr: HostComponent;

      [elemName: string]: any; // catch-all for now
    }
  }

  type DebugProps = {
    source: any;
    self: any;
  };
}

declare module "snabbdom" {
  interface VNodeData {
    luma: {
      debug: DebugProps;
      component: string;
      reconcileComponent: () => VNode;
    };
  }
}

export default {
  ...LumaJS,
  ...Hooks,
  render,
};
