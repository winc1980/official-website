'use client';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * ページ遷移時にスクロール位置をトップへ戻す。
 *
 * Next.js App Router は「遷移先セグメントの先頭要素がビューポート内にあれば
 * スクロールしない」挙動のため、ヘッダー・フッターを共有するレイアウトでは
 * 前ページのスクロール位置が引き継がれてしまうことがある。
 * - ハッシュ付きリンク（例: /projects#apps）はアンカーへのスクロールを優先する
 * - ブラウザの戻る/進む操作ではスクロール位置の復元を優先する
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isPopState = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
