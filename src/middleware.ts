import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  return NextResponse.next();
}

export const config = {};
