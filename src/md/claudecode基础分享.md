- 版本说明
  brew upgrade claude-code是默认升级到稳定版本，想要安装最新版本依次执行：
  brew uninstall claude-code
  brew install claude-code@latest
- 解决claudecode闪烁问题(v2.1.89+)
  settings.local.json中的env增加："CLAUDE_CODE_NO_FLICKER": "1"
- v2.1.88开始原生支持windows PowerShell
- v2.1.89+ @文件提及不再使用JSON转义，缓存命中提升；/buddy宠物彩蛋

0.  终端神器
    ohmyzsh
    一款终端主题软件：https://ohmyz.sh/
    [图片]
    强烈建议再安装一下自动补全插件（autosuggesions+syntax-highlight），对于之前执行过的命令，再次输入会自动补全，体验很好！值得注意的是ohmyzsh的配置会被iterm2/cmux等终端软件自动识别，无需二次配置～
    [图片]
    cmux
    cmux 是面向多任务与 AI Agent 的开源 macOS 终端，提供垂直标签、分屏、内置浏览器、通知提醒、快捷键及 CLI/socket API 自动化能力。集成了gohstty的优点，但是比gohstty功能更丰富

windows替代，请点击waveterm
优点很多：

- 项目分组
- 右上角消息通知
- 左右，上下分屏
- 内置浏览器
- 支持插件调用，比如：lazygit、fresh
  [图片]
  tmuxfffb
  tmux的使用教程: https://www.ruanyifeng.com/blog/2019/10/tmux.html
  主要快捷键
  [图片]

# 水平向右拆分pane

tmux split-window -h "codex \"hello\""

# 垂直向下拆分pane

tmux split-window -h "codex \"hello\""
实际效果参照截图：

- 先终端执行tmux，进入tmux环境
- 然后执行以下命令或者使用上述的快捷键进行拆分pane
  [图片]
  mac灵动岛
  https://vibeisland.app/
  可以一定程度上给枯燥无味的编码提供一丝乐趣
  [图片]

1. 容易忽视的配置/指令/快捷键
   1.1 配置

- 建议关闭auto-compact，这样可以规避以下问题：
  模型有上下文焦虑，当它觉得上下文快满的时候，就会产生焦虑，导致生成质量降低，在这种情况下就算你手动执行 /compact ，也无法解决这个问题，最有用的方案就是重开一个新的会话。
  1. 上下文丢失风险 - 自动压缩可能删除对未来推理重要的早期上下文，导致后续响应缺乏连贯性
  2. 记忆断层 - 压缩后的信息被摘要替代，某些细节可能丢失，特别是在处理复杂多步骤任务时
  3. 调试困难 - 如果压缩了包含错误信息的部分，后续可能无法追溯原始问题根源
  4. 长任务不稳定 - 对于需要跨越大量交互的复杂任务，自动压缩可能在中途破坏上下文完整性

- 使用/effort来代替之前的思考标签
  支持： low/medium/high/max，4个定义清晰的级别
  不需要每次在提示词开头标记，它会直接影响推理引擎，跨任务一致
  之前的使用方式是提示词开头加上：
  “think” < “think hard” < “think harder” < “ultrathink”

- /ide 联动
  比如与trae关联，特别适合根据单个文件 或 单个文件选中的代码段 进行修改的场景
  [图片]

- /terminal-setup的设置
  可以通过按下option+enter组合键进行换行。
  注意：需要重启终端才能生效

如果嫌配置麻烦，Control + J也可以换行

- /vim设置
  开启vim模式，可以通过vim的快捷键进行快速编辑较长篇幅的提示词

  1.2. 指令

- /clear的使用场景
  在同一个会话中从feature A 切换到bug B，建议收到/clear一下，清除无关的上下文，减少模型出现幻觉

- /btw
  /btw基于主会话上下文回答问题，但不影响主会话，不占用主会话的token，可以理解为网页中的一个弹框浮层。
  场景适用于突发奇想的简单问题，比如：
  一段任务开始之后，想问当前采用的方案有什么优势，可以直接：
  /btw 当前采用的方案有什么优势

- /add-dir
  当前项目的附加目录，对于将小程序翻译成app的场景特别适用
  注意：/add-dir指令只针对单次会话生效，如果需要长期生效，可以配置settings.json或者settings.local.json
  {
  "permissions": {
  "additionalDirectories": [
  "/Users/xxx/apps/work/xxx-project"
  ]
  }
  }

- /model opusplan
  在执行计划的时候使用opus模型，否则使用sonnet模型
  [图片]
- 快速启动指令配置
  echo 'alias cc="claude --dangerously-skip-permissions"' >> ~/.zshrc
  source ~/.zshrc

- /export
  可以将自己的对话导出，然后分享给其他人
  1.3. 实用快捷键
- !`command`：可以在claudecode中直接执行脚本
  输出直接显示在对话里，不需要额外的工具调用开销，比如：!git pull
- Control + j ： 换行 或者 输入\，然后再按enter
- Control + r ： 快速搜索历史提示词
- Control + s： 暂存你的提示词，然后在下一个提示词发送之后自动恢复出来
- Control + u ： 快速删除一行
- Control + b ： 将极其耗时的任务推到后台，释放会话输入框
- Command + L： 快速清屏（但保留会话上下文）
  1.4 use askQuestionTools
  在提示词前面增加“use askQuestionTools + 提示词”，ai会结合你的需求简单头脑风暴，分步骤问你问题，比如：
  use askQuestionTools 我想实现小程序的消息推送模块
  [图片]
  [图片]
  [图片]
  按步骤回答即可

2. CLAUDE 配置
   2.1 CLAUDE.md
   2.1.1 优先级说明
   [图片]
   优先级：CLAUDE.local.md (需要gitignore) > ./CLAUDE.md > ~/.claude/CLAUDE.md
   这样可以根据规则的重要程度，规划到不同的级别下。比如x.com上有一些知名博主分享的CLAUDE.md优化技巧，文案如下：
1. 运用第一性原理思考，拒绝经验主义和路径盲从，不要假设我完全清楚目标，保持审慎，从原始需求和问题出发，若目标模糊请停下和我讨论，若目标清晰但路径非最优，请直接建议更短、更低成本的办法。

1. 所有回答必须分为两个部分：
   • 直接执行：按照我当前的要求和逻辑，直接给出任务结果。
   • 深度交互：基于底层逻辑对我的原始需求进行“审慎挑战”。包括但不限于：质疑我的动机是否偏离目标（XY问题）、分析当前路径的弊端、并给出更优雅的替代方案。
   它可以增强AI的思考深度，就比较适合规划到优先级最高的 CLAUDE.local.md 中
   2.1.2 使用的优化技巧

- 保持CLAUDE.md内容简洁，控制在200行以内，将细节按类别细分到 .claude/rules 中，通过@/path/xxx的形式进行引用。
- 创建一个自检清单，在CLAUDE.md中通过@引用，并要求在编码完成后，强制按清单执行自检。
  2.2 settings.local.json
  我们可以将个人觉得有用但又不方便提交的配置写到 settings.local.json （需要被gitignore）中，比如hooks，plugin，permissions等配置。
  举个例子：比如我需要一个plugin，只希望指定项目使用，但又不想放到用户全局。
  2.3 Rules
  可以将项目中的规范进行细分，比如api，type-define，mock，components，然后通过@/path/xxx/xxx.md在CLAUDE.md中引用。

---

paths:

- "src/api/\*_/_.ts"
- "src/xxx/\*_/_.ts"

---

# API Design Rules

- xxxx
- xxxxx
  其中有一个细节：
  如果创建的rule不加paths metadata，它会被当成memory files被直接全量加载。
  而添加paths metadata时，会在实际被匹配时按需加载，一张图即可说明
  [图片]

  2.4 Skill
  2.4.1 skill的形式

有2种形式 (它们都可以作用于：user或project范围)：

- 自定义skill (.claude/skills/xxx)
- Plugin skill

一个小技巧：
skills的安装和更新是即时生效的，不需要重启会话

2.4.2 skill的设计优势

skill有一个很重要的设计原则，叫做“渐进式披露”，它使用3层上下文来最小化token消耗。
第1层：metadata，使用yaml来描述skill的name/description/model/effort等参数（具体查看：官方介绍）。
其中description除了简单描述外，还可以设置skill的触发词。
第2层：主要描述skill的功能和执行步骤。
第3层：其实是最重要的，对应references，可以将第2步中的分步执行细节通过引用的方式指向references中的具体md

2.4.3 skill优化技巧
一个高阶用法：使用codex-runner让claudecode执行计划，codex执行编码

- 多agent共享
  skill本身的设计就是跨ai工具的，比如cc，codex，如何共享？其实很简单

1. 项目根目录创建 .agents/skills 文件夹，设计好的skills放到这里面
2. 通过ln的方式链接到.claude/skills中
   codex天然支持.agents/skills
   [图片]
   不光是codex，下面红框中的都支持
   [图片]

- $ARGUMENTS[N]的使用技巧，3张图即可看懂。
  [图片]
  [图片]
  [图片]
- metadata中设置context: fork 通过subagent的方式运行

---

name: tools:replace-all
description: 在多个文件中执行搜索和替换。当用户说"搜索替换"、"批量替换"、"在多个文件中替换"、"find and replace"时自动触发。
argument-hint: [file-pattern] [search-term] [replacement]
context: fork

---

- 按类别命名skill
  代码参考上面的案例代码
  [图片]
- 通过google设计的“5 agent skill design patterns” skill 模式创建或优化

skill可以通过官方的skill-creator创建，但也有不足之处：SKILL.md信息过多，导致并不完全符合渐进式披露原则。

推荐用google设计的“5 agent skill design patterns”创建新的skill或者优化已有skill，这样更符合渐进式披露原则。
它提供了5个工具，可以覆盖大多数设计场景。
[图片]
下面是我根据“5 agent skill design patterns”生成的 skill-designer，可以直接下载，放到项目的 .claude/skills文件夹中，后续可以用它来设计新的skill或者优化现有的skill。
暂时无法在飞书文档外展示此内容
[图片]
下面是skill提供的5种工具在不同场景下被调用的示例（它会根据你的需求，自动分析判断需要调用哪个工具）
[图片]
比如我让它创建一个 git-submodule skill
[图片]
实际感受就是：比官方的skill-creator要专业很多！

2.5 Agent
v2.1.89开始支持使用 @提及 的方式调用agent
[图片]

---

独立的上下文窗口，不污染主会话，在独立的沙盒中运行。
子代理任务完成后，主会话只会读取其结果，不关注它的过程。这样可以节省主会话窗口的上下文。
[图片]

- 颜色和模型标记

---

name: xxx
description: 实现xxx
model: haiku
color: orange

---

实现指定 xxx

1. xxx
2. xxx
   [图片]

2.6 mcp
MCP（Model Context Protocol）是 Anthropic 提出的协议，让 AI 模型能与外部工具和数据源（如文件系统、浏览器、数据库等）交互，实现 Tool Call 能力。
2.6.1 chrome-devtools-mcp的优化
可以支持非无头模式操作chrome

- 首先将chrome升级到146+版本
- 然后地址栏输入：chrome://inspect/#remote-debugging，按下图操作
  [图片]
- 接着调整mcp配置参数：
  {
  "mcpServers": {
  "chrome-devtools": {
  "command": "npx",
  "args": [
  "-y",
  "chrome-devtools-mcp@latest",

*        "--autoConnect"
        ]
      }

  }
  }

  2.7 commands
  需要注意的是：custom command也会被暴露在/skills 列表中
  自定义command适合做一些简单的操作，比如检查依赖更新，pull代码，执行lint检测等等。
  2.8 plugins
  plugin可以封装skill/mcp/hooks，形成一个可安装的复用单元，更加方便团队共享。

一个小技巧：
plugin安装或卸载后，只需要执行/reload-plugins命令即可，无需重启会话。

2.8.1 必装plugin

- Claude-hud (推荐) 或者 CCometixLine
  claude-hud
  ccometixline

[图片]

[图片]

- 也可以打开statusline.cc，手动配置，实现原理都是一样的
  [图片]
  2.9 hooks
  hooks是claudecode会话的生命周期一系列节点，它们会在 Claude Code 生命周期中的特定节点自动执行。
  比如我们在任务Stop节点去执行代码lint检测
  #!/bin/bash
  cd "$CLAUDE_PROJECT_DIR" || exit 1

# Check if any ts/vue/scss files were modified

if git diff --name-only | grep -E '\.(ts|tsx|vue|scss)$' > /dev/null 2>&1; then
  pnpm lint:fix
else
  exit 0
fi
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/lint-check.sh",
"timeout": 120,
"statusMessage": "Running lint & stylelint checks..."
}
]
}
]
}
}
[图片] 3. 节省token
经过一波优化下来，每个新的会话初始化token占用是8%
[图片]
3.1 Agent
subagent使用的是独立的上下文窗口，所以天然的可以达到节省主会话token的效果。
参考 agent
3.2 Mcp配置优化

- 通过 ENABLE_TOOL_SEARCH=true claude 启动会话
- 直接全局配置
  {
  "env": {

* "ENABLE_TOOL_SEARCH": "true"
  }
  }
  下面配置前后效果对比：
  [图片]

[图片]
3.3 rtk-ai
其实就是!`command`的升级版工具，可以压缩原始bash的上下文，将不太重要的信息去除
https://www.rtk-ai.app/
[图片]
3.4 LSP
LSP（Language Server Protocol）是编辑器和语言服务器之间的通信协议，提供代码导航（跳转到定义/引用）、悬停提示、符号搜索、代码补全、诊断等 IDE 智能功能。LSP 已被主流 IDE 广泛支持，比如常用的JetBrains/vscode
注意：需要/config打开 auto-connect-to-ide设置

- 通过 ENABLE_LSP_TOOL=1 claude 启动会话
- 直接全局配置
  {
  "env": {

* "ENABLE_LSP_TOOL": "1"
  }
  }
  下面是实际的调用效果，图中的操作其实就是我们编码过程中 右键转到定义 的功能。（我自己测试了下，不是很稳定，有时候可以，有时候不行）
  [图片]

4. Worktree
   Git worktree不是什么很新的特性，手动操作worktree，只需要看这篇文章即可：
   https://www.cnblogs.com/thxiso/p/19412803
   通过claudecode去操作worktree会显得相对高效，命令如下：
   claude --worktree [worktree name]
   比如通过claude --worktree feature/natural，会自动创建一个名称是feature/natural的worktree
   [图片]
   所有通过cc创建的worktrees都会保存在.claude/worktrees文件夹中，当任务完成后，我们可以直接让cc自动合并到主分支，并清除相应worktree
5. 实战
   5.1 文档上下文共享
   徐老师说过“文档是AI最好的提示词”，我也是这么觉得～
   参考徐老师的体系先搭建一套文档库（单独的仓库），包括：产品prd，迭代文档，接口文档，前端文档，后端文档，形成一套完整的文档体系，让AI能更好的了解项目。
   唯一的不同，我是将文档仓库作为git submodule的形式加入主项目，前端/后端；
   git submodule的功能就不过多介绍了，这样做：
6. 不需要--add-dir
7. 能及时更新最新文档，创建了3个自定义指令，更加快捷的管理submodule
   [图片]
   5.2 Agent Teams

- 通过tmux + agent team
  {
  "env": {

* "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
  }
  创建一个 agent team，包含 2 个队友：
  队友 A：在独立 worktree 中负责xxx
  队友 B：在独立 worktree 中负责xxx
  完成任务后，合并到xx分支，并自动清理worktrees

[图片]
5.3 使用codex-runner skill让cc执行计划，codex执行编码
Claudecode 费token已经是一个共识了，相反codex在token的消耗上比起claudecode要好太多了，可谓是量大管饱，并且gpt-5.3-codex的编码能力还可以，满足日常开发足够了。

所以我在想，能不能让claudecode 执行计划，然后丢给codex去执行，然后将结果返回给cc
实施步骤：效果可以直接看视频

- 创建codex-runner skill
  不是常规的claudecode codex mcp或者claudecode codex skills或者codex-plugin-cc，因为这3种都是静默在claudecode会话中的，体验不好，比如崩了无法继续。
  当前方案使用的是：smux，效果可以直接看视频
  一键式 tmux配置，支持终端自动化，适用于 AI 代理:
  终端自动拆分的功能需要结合tmux
- 对于用户而言，可通过键盘驱动配置 tmux，支持 Option 键绑定、鼠标操作和面板标签。
- 对于代理而言，tmux-bridge CLI 允许任何代理读取、输入和发送按键到任何面板。代理间交互方面，Claude Code 可以提示 Codex 在下一个面板中输入内容，Codex 会做出回应。任何能够运行 bash 的代理都可以参与。
  /skill-designer 使用chrome-devtools-mcp 查看 https://github.com/ShawnPana/smux 这个是tmux-bridge
  ，可以实现tmux拆分终端之间的通信，那可以不可以创建一个skil，并结合$ARGUMENTS[n]的技巧，实现：在主
  会话中使用claudecode分析需求，列出计划，然后在主会话旁边拆分一个会话窗口，通过codex --yolo
  "提示词"去执行这个任务，这样可以看到codex完整的会话过程，当任务编写成功将结果通过smux提供的tmux-b
  ridge告知主会话
- 实际测试
  [图片]
  暂时无法在飞书文档外展示此内容

[图片]
[图片]

- 计划派发后，主会话还可以继续其他任务
  codex 完成后会通过 tmux-bridge 主动推送结果到主会话
  [图片]
- 异常场景自动检测：
  tmux-bridge会实时观测每个窗口的状态，比如codex502或意外中断，主会话也可以实时知晓，如下：
  [图片]

6. claudecode速查表
   [图片]
   下期预告
   串联skills实现模块任务流编排自动开发
   [图片]
   [图片]

[图片]
