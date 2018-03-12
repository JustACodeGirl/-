package com.ovt.alarm.common.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

public class ImageUtil {
	
	   /**
		 * 成比例缩小图片
		 * 
		 * @param is 图片输入流
		 * @param ratio 缩小倍数(大于1)
		 * @param formatName 文件格式
		 * @return BufferedImage
		 */
	public static BufferedImage resize(InputStream is,double ratio)
	{
		try {
			Image src = ImageIO.read(is);
			int w0 = src.getWidth(null);
			int h0 = src.getHeight(null);
			BufferedImage tag = new BufferedImage((int)(w0/ratio), (int)(h0/ratio), BufferedImage.TYPE_INT_RGB);
			tag.getGraphics().drawImage(src.getScaledInstance((int)(w0/ratio), (int)(h0/ratio), Image.SCALE_SMOOTH),0,0,null);
            if (is != null)
            {
                try
                {
                    is.close();
                }
                catch (IOException e)
                {
                }
            }
			return tag;
//			
//			Image itemp=bi.getScaledInstance(width, height, bi.SCALE_SMOOTH);
//			if((bi.getHeight() > height) || (bi.getWidth()>width)){
//				if(bi.getHeight() > bi.getWidth()){
//					ratio=(new Integer(height)).doubleValue()/bi.getHeight();
//				}else{
//					ratio=(new Integer(width)).doubleValue()/bi.getWidth();
//				}
//				AffineTransformOp op = new AffineTransformOp(AffineTransform.getScaleInstance(ratio, ratio), null);
//				itemp = op.filter(bi, null);
//			}
//			
//			ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
//			ImageOutputStream imageOut;
//			imageOut=ImageIO.createImageOutputStream(byteOut);
//			ImageIO.write((BufferedImage)itemp, formatName, imageOut);
		} catch (IOException e) {
			 e.printStackTrace();
		}
		return null;
	}

}
