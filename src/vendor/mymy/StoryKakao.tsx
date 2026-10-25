import { MymyKakao } from "./Apps";
import { useSkinState } from "../../skinState";
import type { SkinProps } from "../../AppSkins";
import { ArrowLeft, Menu, Plus, Smile } from "lucide-react";

type Line = {
  from: "friend" | "you";
  body: string;
  revealAfter: number;
  time: string;
};

const LINES: Line[] = [
  { from: "friend", body: "昨晚咋了 消息都没回", revealAfter: 0, time: "11:39" },
  { from: "friend", body: "下午要不要出门", revealAfter: 0, time: "11:39" },
  { from: "you", body: "我昨天回老家", revealAfter: 1, time: "11:42" },
  { from: "you", body: "手机摔了ㅠㅠ", revealAfter: 2, time: "11:42" },
  { from: "friend", body: "我去 咋回事 开不了机吗", revealAfter: 2, time: "11:43" },
  { from: "you", body: "在老家的时候开不了", revealAfter: 3, time: "11:43" },
  { from: "you", body: "一回家发现没事了", revealAfter: 4, time: "11:43" },
  { from: "you", body: "只是屏幕磕碰了一下 应该没关系！", revealAfter: 5, time: "11:44" },
  { from: "friend", body: "那下午要不要去手机店看看", revealAfter: 5, time: "11:44" },
  { from: "you", body: "我下午约了私教课呢", revealAfter: 6, time: "11:45" },
  { from: "you", body: "要不你帮我把手机拿去看看", revealAfter: 7, time: "11:45" },
  { from: "you", body: "我下课后再一起去逛逛", revealAfter: 8, time: "11:45" },
  { from: "friend", body: "行啊 那下午在老地方见", revealAfter: 8, time: "11:46" },
  { from: "friend", body: "你手机密码多少来着？", revealAfter: 8, time: "11:46" },
  { from: "you", body: "0412", revealAfter: 9, time: "11:46" },
  { from: "friend", body: "这到底是啥意思ㅋㅋㅋ 哪个前任生日？", revealAfter: 9, time: "11:46" },
  { from: "you", body: "滚呢 是我家门牌号 我懒得想了", revealAfter: 10, time: "11:47" },
  { from: "friend", body: "ㅋㅋㅋㅋ知道了 下午见", revealAfter: 10, time: "11:47" },
];

export function StoryKakao(p: SkinProps) {
  const marker = p.items.some((item) => item.id === "opening-marker");
  if (!marker) return <MymyKakao {...p} />;

  const [step, setStep] = useSkinState<number>(p, "opening-sent-count", 0);
  const [draft, setDraft] = useSkinState<string>(p, "opening-draft", "");
  const [menu, setMenu] = useSkinState<boolean>(p, "opening-menu", false);
  const next = LINES.find((line) => line.from === "you" && line.revealAfter > step);
  const shown = LINES.filter((line) => line.revealAfter <= step);

  const fillNext = () => {
    if (next && !draft) setDraft(next.body);
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!next || draft.trim() !== next.body) return;
    setStep(Math.min(10, step + 1));
    setDraft("");
  };

  return (
    <div className="mymy-ui mymy-kakao" data-mymy="kakao">
      {p.thread ? (
        <>
          <header className="kzth">
            <button aria-label="返回聊天列表" onClick={() => p.onThread("")}>
              <ArrowLeft size={22} />
            </button>
            <span className="kzname">{p.thread}</span>
            <span className="kzpill">
              <button aria-label="聊天菜单" onClick={() => setMenu(!menu)}>
                <Menu size={21} />
              </button>
            </span>
          </header>
          <div className="msgs kk" style={{ overflowY: "auto" }}>
            <div className="bubble-date">2026-10-26</div>
            {shown.map((line, i) => (
              <div
                key={`${i}-${line.body}`}
                className={"kzm " + (line.from === "you" ? "kzmy" : "kzot")}
              >
                {line.from === "friend" && <div className="kzmav"><span className="skin-avatar">秀</span></div>}
                {line.from === "friend" && <div className="kzmn">秀恩</div>}
                <div className="kzbub">
                  {line.body}
                  <small className="kzt">{line.time}</small>
                </div>
              </div>
            ))}
          </div>
          <form
            className="kzinp"
            onSubmit={send}
          >
            <button type="button" aria-label="更多功能" onClick={fillNext}>
              <Plus size={21} />
            </button>
            <input
              aria-label="KKT消息"
              placeholder={next ? "点这里填入下一条固定消息" : "今天下午见！"}
              value={draft}
              readOnly
              onClick={fillNext}
            />
            <Smile size={22} />
            <button
              className={draft ? "go" : ""}
              aria-label="发送KKT消息"
              disabled={!draft || !next || draft !== next.body}
            >
              ↑
            </button>
          </form>
          {menu && (
            <div className="mymy-local-menu">
              <strong>秀恩</strong>
              <p>聊天信息</p>
              <button onClick={() => setMenu(false)}>完成</button>
            </div>
          )}
          {step >= 10 && (
            <div className="mymy-local-menu">
              <strong>约好了</strong>
              <p>下午在老地方见。你把手机放回桌上，屏幕边缘那道磕痕仍然很浅。</p>
              <button onClick={() => setMenu(false)}>知道了</button>
            </div>
          )}
        </>
      ) : (
        <div className="kzkk">
          <div className="kzhd">
            <header className="kzkh">
              <b className="kzti">聊天</b>
              <span className="kzic">
                <button aria-label="KKT设置" onClick={() => setMenu(!menu)}>
                  <Menu size={21} />
                </button>
              </span>
            </header>
            <div className="kzkc2">
              <button className="kzkpl">好友</button>
              <button className="kzkpl on">聊天</button>
            </div>
          </div>
          <div className="kzkb">
            <div className="kzksec">全部聊天 1</div>
            <button className="kzkr kzkcr" onClick={() => p.onThread("秀恩")}>
              <span className="skin-avatar">秀</span>
              <span className="kzkn">
                <b>秀恩</b>
                <small>{shown.at(-1)?.body || "昨晚咋了 消息都没回"}</small>
              </span>
              <span className="kzkmt">11:39</span>
            </button>
          </div>
          <nav className="kzknv">
            <button aria-label="好友"><span>♙</span></button>
            <button className="on" aria-label="聊天"><span>▤</span></button>
            <button aria-label="发现"><span>⌕</span></button>
            <button aria-label="更多"><span>▦</span></button>
            <button aria-label="设置"><span>···</span></button>
          </nav>
        </div>
      )}
    </div>
  );
}
