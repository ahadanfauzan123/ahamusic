import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
//mengenerate token yang expire dengan token ayng baru
async function refreshAccessToken(token) {
    try {
      const url =
        "https://accounts.spotify.com/api/token?" +
        new URLSearchParams({
          client_id: process.env.SPOTIFY_CLIENT_ID,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });
  
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token | agar nanti jika expire lagi statusnya bukan "refreshedTokens"
      };
    } catch (error) {
      console.log(error);
  
      return {
        ...token,
        error: "RefreshAccessTokenError | Gagal Merefresh token!!",
      };
    }
  }


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization :
      "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read",
    
    }),
    // ...add more providers here
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        //kalau yang ingin direturn token, maka pakai jwt
        async jwt({token, user, account}){
          // Initial sign in
          //jika ada akun dan user yang terbaca, maka berikan akses token
        if (account && user) {
            return {
                accessToken: account.accessToken,
                accessTokenExpires: Date.now() + account.expires_in * 1000,
                refreshToken: account.refresh_token,
                user,
            };
        }
    
          // Return previous token if the access token has not expired yet
          //karena token bisa saja expire, token akan dicek terlebih dahulu. Apabila belum expire maka pakai token yang lama
          //jadi sebelum tanggal expire
          if (Date.now() < token.accessTokenExpires) {
            return token;
          }
    
          // Access token has expired, try to update it
          //jika token expire, ini akan membuat data menjadi error, makanya harus di refresh
          //akan mengirimkan akses token ke function yang ada diatas untuk nantinya di update
          return refreshAccessToken(token);
        },
        //memberikan session
        async session({ session, token }) {
          session.user = token.user;
          session.accessToken = token.accessToken;
          session.error = token.error;
    
          return session;
        },
      },
})