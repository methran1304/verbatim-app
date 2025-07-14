import {
  NzSkeletonComponent,
  NzSkeletonModule
} from "./chunk-N6BY4VQS.js";
import {
  timeUnits
} from "./chunk-KNI6C7BA.js";
import "./chunk-BQ76GOFF.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-24KTSKJN.js";
import {
  padStart,
  takeUntilDestroyed
} from "./chunk-EJDUWVHF.js";
import "./chunk-4MSBZFBT.js";
import {
  Directionality
} from "./chunk-WLOECXON.js";
import "./chunk-FBZCQUFG.js";
import {
  Platform
} from "./chunk-BOZSF3KH.js";
import {
  NgTemplateOutlet,
  NumberSymbol,
  getLocaleNumberSymbol
} from "./chunk-LSBJC5JV.js";
import "./chunk-7DPHYZ4E.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Output,
  Pipe,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-H6TTZC7H.js";
import "./chunk-BDNK23TI.js";
import "./chunk-ZY5HDIHX.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-pipe.mjs
var NzTimeRangePipe = class _NzTimeRangePipe {
  transform(value, format = "HH:mm:ss") {
    let duration = Number(value || 0);
    return timeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(new RegExp(`${name}+`, "g"), (match) => padStart(v.toString(), match.length, "0"));
      }
      return current;
    }, format);
  }
  static ɵfac = function NzTimeRangePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTimeRangePipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "nzTimeRange",
    type: _NzTimeRangePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimeRangePipe, [{
    type: Pipe,
    args: [{
      name: "nzTimeRange"
    }]
  }], null, null);
})();
var NzPipesModule = class _NzPipesModule {
  static ɵfac = function NzPipesModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzPipesModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzPipesModule,
    imports: [NzTimeRangePipe],
    exports: [NzTimeRangePipe]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPipesModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimeRangePipe],
      exports: [NzTimeRangePipe]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-statistic.mjs
var _c0 = (a0) => ({
  $implicit: a0
});
function NzStatisticNumberComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.nzValueTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.nzValue));
  }
}
function NzStatisticNumberComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.displayInt);
  }
}
function NzStatisticNumberComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.displayDecimal);
  }
}
function NzStatisticNumberComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzStatisticNumberComponent_Conditional_2_Conditional_0_Template, 2, 1, "span", 2);
    ɵɵconditionalCreate(1, NzStatisticNumberComponent_Conditional_2_Conditional_1_Template, 2, 1, "span", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.displayInt ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.displayDecimal ? 1 : -1);
  }
}
function NzStatisticComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzTitle);
  }
}
function NzStatisticComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton", 2);
  }
  if (rf & 2) {
    ɵɵproperty("nzParagraph", false);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzPrefix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtemplate(1, NzStatisticComponent_Conditional_3_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.nzPrefix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzSuffix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtemplate(1, NzStatisticComponent_Conditional_3_Conditional_3_ng_container_1_Template, 2, 1, "ng-container", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.nzSuffix);
  }
}
function NzStatisticComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵconditionalCreate(1, NzStatisticComponent_Conditional_3_Conditional_1_Template, 2, 1, "span", 5);
    ɵɵelement(2, "nz-statistic-number", 6);
    ɵɵconditionalCreate(3, NzStatisticComponent_Conditional_3_Conditional_3_Template, 2, 1, "span", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r0.nzValueStyle);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzPrefix ? 1 : -1);
    ɵɵadvance();
    ɵɵproperty("nzValue", ctx_r0.nzValue)("nzValueTemplate", ctx_r0.nzValueTemplate);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzSuffix ? 3 : -1);
  }
}
function NzCountdownComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
    ɵɵpipe(1, "nzTimeRange");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵtextInterpolate(ɵɵpipeBind2(1, 1, ctx_r0.diff, ctx_r0.nzFormat));
  }
}
var NzStatisticNumberComponent = class _NzStatisticNumberComponent {
  nzValue;
  nzValueTemplate;
  displayInt = "";
  displayDecimal = "";
  locale_id = inject(LOCALE_ID);
  ngOnChanges() {
    this.formatNumber();
  }
  formatNumber() {
    const decimalSeparator = typeof this.nzValue === "number" ? "." : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
    const value = String(this.nzValue);
    const [int, decimal] = value.split(decimalSeparator);
    this.displayInt = int;
    this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : "";
  }
  static ɵfac = function NzStatisticNumberComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStatisticNumberComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzStatisticNumberComponent,
    selectors: [["nz-statistic-number"]],
    inputs: {
      nzValue: "nzValue",
      nzValueTemplate: "nzValueTemplate"
    },
    exportAs: ["nzStatisticNumber"],
    features: [ɵɵNgOnChangesFeature],
    decls: 3,
    vars: 1,
    consts: [[1, "ant-statistic-content-value"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-statistic-content-value-int"], [1, "ant-statistic-content-value-decimal"]],
    template: function NzStatisticNumberComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "span", 0);
        ɵɵconditionalCreate(1, NzStatisticNumberComponent_Conditional_1_Template, 1, 4, "ng-container", 1)(2, NzStatisticNumberComponent_Conditional_2_Template, 2, 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵconditional(ctx.nzValueTemplate ? 1 : 2);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticNumberComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-statistic-number",
      exportAs: "nzStatisticNumber",
      template: `
    <span class="ant-statistic-content-value">
      @if (nzValueTemplate) {
        <ng-container
          [ngTemplateOutlet]="nzValueTemplate"
          [ngTemplateOutletContext]="{ $implicit: nzValue }"
        ></ng-container>
      } @else {
        @if (displayInt) {
          <span class="ant-statistic-content-value-int">{{ displayInt }}</span>
        }
        @if (displayDecimal) {
          <span class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
        }
      }
    </span>
  `,
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    nzValue: [{
      type: Input
    }],
    nzValueTemplate: [{
      type: Input
    }]
  });
})();
var NzStatisticComponent = class _NzStatisticComponent {
  nzPrefix;
  nzSuffix;
  nzTitle;
  nzValue;
  nzValueStyle = {};
  nzValueTemplate;
  nzLoading = false;
  dir = "ltr";
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  directionality = inject(Directionality);
  ngOnInit() {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  static ɵfac = function NzStatisticComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStatisticComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzStatisticComponent,
    selectors: [["nz-statistic"]],
    hostAttrs: [1, "ant-statistic"],
    hostVars: 2,
    hostBindings: function NzStatisticComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-statistic-rtl", ctx.dir === "rtl");
      }
    },
    inputs: {
      nzPrefix: "nzPrefix",
      nzSuffix: "nzSuffix",
      nzTitle: "nzTitle",
      nzValue: "nzValue",
      nzValueStyle: "nzValueStyle",
      nzValueTemplate: "nzValueTemplate",
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute]
    },
    exportAs: ["nzStatistic"],
    decls: 4,
    vars: 2,
    consts: [[1, "ant-statistic-title"], [4, "nzStringTemplateOutlet"], [1, "ant-statistic-skeleton", 3, "nzParagraph"], [1, "ant-statistic-content", 3, "style"], [1, "ant-statistic-content"], [1, "ant-statistic-content-prefix"], [3, "nzValue", "nzValueTemplate"], [1, "ant-statistic-content-suffix"]],
    template: function NzStatisticComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, NzStatisticComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵelementEnd();
        ɵɵconditionalCreate(2, NzStatisticComponent_Conditional_2_Template, 1, 1, "nz-skeleton", 2)(3, NzStatisticComponent_Conditional_3_Template, 4, 6, "div", 3);
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("nzStringTemplateOutlet", ctx.nzTitle);
        ɵɵadvance();
        ɵɵconditional(ctx.nzLoading ? 2 : 3);
      }
    },
    dependencies: [NzSkeletonModule, NzSkeletonComponent, NzStatisticNumberComponent, NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-statistic",
      exportAs: "nzStatistic",
      template: `
    <div class="ant-statistic-title">
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
    </div>
    @if (nzLoading) {
      <nz-skeleton class="ant-statistic-skeleton" [nzParagraph]="false" />
    } @else {
      <div class="ant-statistic-content" [style]="nzValueStyle">
        @if (nzPrefix) {
          <span class="ant-statistic-content-prefix">
            <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
          </span>
        }
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"></nz-statistic-number>
        @if (nzSuffix) {
          <span class="ant-statistic-content-suffix">
            <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
          </span>
        }
      </div>
    }
  `,
      host: {
        class: "ant-statistic",
        "[class.ant-statistic-rtl]": `dir === 'rtl'`
      },
      imports: [NzSkeletonModule, NzStatisticNumberComponent, NzOutletModule]
    }]
  }], null, {
    nzPrefix: [{
      type: Input
    }],
    nzSuffix: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzValue: [{
      type: Input
    }],
    nzValueStyle: [{
      type: Input
    }],
    nzValueTemplate: [{
      type: Input
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var REFRESH_INTERVAL = 1e3 / 30;
var NzCountdownComponent = class _NzCountdownComponent extends NzStatisticComponent {
  ngZone = inject(NgZone);
  platform = inject(Platform);
  nzFormat = "HH:mm:ss";
  nzCountdownFinish = new EventEmitter();
  diff;
  target = 0;
  intervalId = null;
  constructor() {
    super();
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }
  ngOnChanges(changes) {
    const {
      nzValue
    } = changes;
    if (nzValue) {
      this.target = Number(nzValue.currentValue);
      if (!nzValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.syncTimer();
  }
  syncTimer() {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }
  startTimer() {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.stopTimer();
        this.intervalId = setInterval(() => {
          this.updateValue();
          this.cdr.detectChanges();
        }, REFRESH_INTERVAL);
      });
    }
  }
  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  /**
   * Update time that should be displayed on the screen.
   */
  updateValue() {
    this.diff = Math.max(this.target - Date.now(), 0);
    if (this.diff === 0) {
      this.stopTimer();
      if (this.nzCountdownFinish.observers.length) {
        this.ngZone.run(() => this.nzCountdownFinish.emit());
      }
    }
  }
  static ɵfac = function NzCountdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCountdownComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzCountdownComponent,
    selectors: [["nz-countdown"]],
    inputs: {
      nzFormat: "nzFormat"
    },
    outputs: {
      nzCountdownFinish: "nzCountdownFinish"
    },
    exportAs: ["nzCountdown"],
    features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
    decls: 3,
    vars: 6,
    consts: [["countDownTpl", ""], [3, "nzValue", "nzValueStyle", "nzValueTemplate", "nzTitle", "nzPrefix", "nzSuffix"]],
    template: function NzCountdownComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelement(0, "nz-statistic", 1);
        ɵɵtemplate(1, NzCountdownComponent_ng_template_1_Template, 2, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        const countDownTpl_r2 = ɵɵreference(2);
        ɵɵproperty("nzValue", ctx.diff)("nzValueStyle", ctx.nzValueStyle)("nzValueTemplate", ctx.nzValueTemplate || countDownTpl_r2)("nzTitle", ctx.nzTitle)("nzPrefix", ctx.nzPrefix)("nzSuffix", ctx.nzSuffix);
      }
    },
    dependencies: [NzStatisticComponent, NzPipesModule, NzTimeRangePipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCountdownComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-countdown",
      exportAs: "nzCountdown",
      template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    ></nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `,
      imports: [NzStatisticComponent, NzPipesModule]
    }]
  }], () => [], {
    nzFormat: [{
      type: Input
    }],
    nzCountdownFinish: [{
      type: Output
    }]
  });
})();
var NzStatisticModule = class _NzStatisticModule {
  static ɵfac = function NzStatisticModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStatisticModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzStatisticModule,
    imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
    exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzStatisticComponent, NzCountdownComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticModule, [{
    type: NgModule,
    args: [{
      imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent],
      exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent]
    }]
  }], null, null);
})();
export {
  NzCountdownComponent,
  NzStatisticComponent,
  NzStatisticModule,
  NzStatisticNumberComponent
};
//# sourceMappingURL=ng-zorro-antd_statistic.js.map
